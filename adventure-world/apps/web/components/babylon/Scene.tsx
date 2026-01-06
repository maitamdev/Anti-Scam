'use client';

import { useEffect, useRef, useState } from 'react';
import {
    Engine,
    Scene,
    ArcRotateCamera,
    HemisphericLight,
    Vector3,
    MeshBuilder,
    StandardMaterial,
    Color3,
    Color4,
    ActionManager,
    ExecuteCodeAction,
    Mesh,
    PointLight,
} from '@babylonjs/core';

interface SceneProps {
    sceneType: 'hub' | 'zone';
    zoneId?: string;
    userId?: string;
    username?: string;
    onPortalEnter?: (zoneId: string) => void;
    onNPCInteract?: (npcId: string) => void;
    onReturnToHub?: () => void;
}

export default function BabylonScene({
    sceneType,
    zoneId,
    userId,
    username,
    onPortalEnter,
    onNPCInteract,
    onReturnToHub,
}: SceneProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<Engine | null>(null);
    const sceneRef = useRef<Scene | null>(null);
    const playerRef = useRef<Mesh | null>(null);

    // Movement state
    const keysPressed = useRef<Set<string>>(new Set());
    const [interactTarget, setInteractTarget] = useState<string | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Initialize engine
        const engine = new Engine(canvasRef.current, true);
        engineRef.current = engine;

        // Create scene
        const scene = new Scene(engine);
        scene.clearColor = new Color4(0.05, 0.08, 0.15, 1);
        sceneRef.current = scene;

        // Camera
        const camera = new ArcRotateCamera(
            'camera',
            -Math.PI / 2,
            Math.PI / 3,
            15,
            Vector3.Zero(),
            scene
        );
        camera.attachControl(canvasRef.current, true);
        camera.lowerRadiusLimit = 5;
        camera.upperRadiusLimit = 30;
        camera.wheelPrecision = 50;

        // Lighting
        const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
        light.intensity = 0.8;

        // Create environment based on scene type
        if (sceneType === 'hub') {
            createHubScene(scene);
        } else {
            createZoneScene(scene, zoneId || 'z1');
        }

        // Create player
        const player = MeshBuilder.CreateCapsule('player', { height: 2, radius: 0.5 }, scene);
        player.position = new Vector3(0, 1, 0);
        const playerMat = new StandardMaterial('playerMat', scene);
        playerMat.diffuseColor = new Color3(0.2, 0.5, 1);
        playerMat.emissiveColor = new Color3(0.1, 0.2, 0.5);
        player.material = playerMat;
        playerRef.current = player;

        // Player point light
        const playerLight = new PointLight('playerLight', new Vector3(0, 3, 0), scene);
        playerLight.intensity = 0.3;
        playerLight.parent = player;

        // Camera follow player
        camera.setTarget(player.position);

        // Input handling
        const handleKeyDown = (e: KeyboardEvent) => {
            keysPressed.current.add(e.key.toLowerCase());

            // Interact with E
            if (e.key.toLowerCase() === 'e' && interactTarget) {
                if (interactTarget.startsWith('portal_') && onPortalEnter) {
                    const zoneId = interactTarget.replace('portal_', '');
                    onPortalEnter(zoneId);
                } else if (interactTarget.startsWith('npc_') && onNPCInteract) {
                    onNPCInteract(interactTarget);
                } else if (interactTarget === 'return_portal' && onReturnToHub) {
                    onReturnToHub();
                }
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            keysPressed.current.delete(e.key.toLowerCase());
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Game loop
        scene.registerBeforeRender(() => {
            if (!playerRef.current) return;

            const speed = 0.15;
            let moved = false;

            if (keysPressed.current.has('w')) {
                playerRef.current.position.z += speed;
                moved = true;
            }
            if (keysPressed.current.has('s')) {
                playerRef.current.position.z -= speed;
                moved = true;
            }
            if (keysPressed.current.has('a')) {
                playerRef.current.position.x -= speed;
                moved = true;
            }
            if (keysPressed.current.has('d')) {
                playerRef.current.position.x += speed;
                moved = true;
            }

            // Keep camera following player
            camera.setTarget(playerRef.current.position);

            // Check for nearby interactables
            checkInteractables(scene, playerRef.current);
        });

        // Render loop
        engine.runRenderLoop(() => {
            scene.render();
        });

        // Resize handler
        const handleResize = () => {
            engine.resize();
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('resize', handleResize);
            scene.dispose();
            engine.dispose();
        };
    }, [sceneType, zoneId]);

    const createHubScene = (scene: Scene) => {
        // Ground
        const ground = MeshBuilder.CreateGround('ground', { width: 50, height: 50 }, scene);
        const groundMat = new StandardMaterial('groundMat', scene);
        groundMat.diffuseColor = new Color3(0.15, 0.25, 0.15);
        ground.material = groundMat;

        // Plaza center
        const plaza = MeshBuilder.CreateCylinder('plaza', { height: 0.1, diameter: 15 }, scene);
        plaza.position.y = 0.05;
        const plazaMat = new StandardMaterial('plazaMat', scene);
        plazaMat.diffuseColor = new Color3(0.4, 0.35, 0.3);
        plaza.material = plazaMat;

        // Portals for each zone
        const portalColors = [
            new Color3(0.1, 0.8, 0.3), // Z1 Green
            new Color3(0.9, 0.7, 0.2), // Z2 Yellow
            new Color3(0.2, 0.5, 0.9), // Z3 Blue
            new Color3(0.7, 0.2, 0.8), // Z4 Purple
        ];

        const zoneIds = ['z1', 'z2', 'z3', 'z4'];
        const zoneLabels = ['Phishing Forest', 'Message Mirage', 'Fake Shop Harbor', 'Identity Rift'];

        zoneIds.forEach((zid, i) => {
            const angle = (i / 4) * Math.PI * 2;
            const x = Math.cos(angle) * 12;
            const z = Math.sin(angle) * 12;

            const portal = MeshBuilder.CreateTorus(`portal_${zid}`, { diameter: 4, thickness: 0.3 }, scene);
            portal.position = new Vector3(x, 2, z);
            portal.rotation.x = Math.PI / 2;

            const portalMat = new StandardMaterial(`portalMat_${zid}`, scene);
            portalMat.diffuseColor = portalColors[i];
            portalMat.emissiveColor = portalColors[i].scale(0.5);
            portal.material = portalMat;

            // Portal light
            const portalLight = new PointLight(`portalLight_${zid}`, new Vector3(x, 2, z), scene);
            portalLight.diffuse = portalColors[i];
            portalLight.intensity = 0.5;

            // Portal base
            const base = MeshBuilder.CreateCylinder(`base_${zid}`, { height: 0.5, diameter: 5 }, scene);
            base.position = new Vector3(x, 0.25, z);
            base.material = plazaMat;
        });

        // NPCs
        createNPC(scene, 'npc_guide', new Vector3(5, 0, 0), new Color3(0.9, 0.7, 0.2));
        createNPC(scene, 'npc_quest_master', new Vector3(-5, 0, 5), new Color3(0.3, 0.6, 0.9));
        createNPC(scene, 'npc_scanner', new Vector3(10, 0, -5), new Color3(0.8, 0.3, 0.3));

        // Scan Center building
        const scanBuilding = MeshBuilder.CreateBox('scanBuilding', { width: 6, height: 5, depth: 6 }, scene);
        scanBuilding.position = new Vector3(10, 2.5, -5);
        const buildingMat = new StandardMaterial('buildingMat', scene);
        buildingMat.diffuseColor = new Color3(0.3, 0.3, 0.4);
        scanBuilding.material = buildingMat;

        // Trees (decoration)
        for (let i = 0; i < 15; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 18 + Math.random() * 5;
            const x = Math.cos(angle) * dist;
            const z = Math.sin(angle) * dist;
            createTree(scene, new Vector3(x, 0, z));
        }
    };

    const createZoneScene = (scene: Scene, zoneId: string) => {
        // Zone-specific ground color
        const groundColors: Record<string, Color3> = {
            z1: new Color3(0.1, 0.2, 0.1), // Dark forest green
            z2: new Color3(0.4, 0.35, 0.2), // Sand
            z3: new Color3(0.15, 0.2, 0.25), // Harbor grey
            z4: new Color3(0.15, 0.1, 0.2), // Purple void
        };

        // Ground
        const ground = MeshBuilder.CreateGround('ground', { width: 40, height: 40 }, scene);
        const groundMat = new StandardMaterial('groundMat', scene);
        groundMat.diffuseColor = groundColors[zoneId] || groundColors.z1;
        ground.material = groundMat;

        // Return portal
        const returnPortal = MeshBuilder.CreateTorus('return_portal', { diameter: 3, thickness: 0.2 }, scene);
        returnPortal.position = new Vector3(0, 1.5, -15);
        returnPortal.rotation.x = Math.PI / 2;
        const returnMat = new StandardMaterial('returnMat', scene);
        returnMat.diffuseColor = new Color3(1, 1, 1);
        returnMat.emissiveColor = new Color3(0.5, 0.5, 0.5);
        returnPortal.material = returnMat;

        // Zone specific decorations
        if (zoneId === 'z1') {
            // Phishing Forest - lots of trees
            for (let i = 0; i < 30; i++) {
                const x = (Math.random() - 0.5) * 35;
                const z = (Math.random() - 0.5) * 35;
                if (Math.abs(x) > 3 || Math.abs(z) > 3) {
                    createTree(scene, new Vector3(x, 0, z), true);
                }
            }
        }

        // Quest markers
        createQuestMarker(scene, new Vector3(8, 0, 5), 'q1');
        createQuestMarker(scene, new Vector3(-8, 0, 8), 'q2');
        createQuestMarker(scene, new Vector3(0, 0, 12), 'q3');
    };

    const createNPC = (scene: Scene, id: string, position: Vector3, color: Color3) => {
        const npc = MeshBuilder.CreateCapsule(id, { height: 2, radius: 0.5 }, scene);
        npc.position = new Vector3(position.x, 1, position.z);
        const npcMat = new StandardMaterial(`${id}Mat`, scene);
        npcMat.diffuseColor = color;
        npcMat.emissiveColor = color.scale(0.3);
        npc.material = npcMat;

        // Floating marker above NPC
        const marker = MeshBuilder.CreateBox(`${id}_marker`, { size: 0.3 }, scene);
        marker.position = new Vector3(position.x, 3, position.z);
        marker.material = npcMat;

        return npc;
    };

    const createTree = (scene: Scene, position: Vector3, glowing = false) => {
        const trunk = MeshBuilder.CreateCylinder('trunk', { height: 2, diameter: 0.5 }, scene);
        trunk.position = new Vector3(position.x, 1, position.z);
        const trunkMat = new StandardMaterial('trunkMat', scene);
        trunkMat.diffuseColor = new Color3(0.3, 0.2, 0.1);
        trunk.material = trunkMat;

        const leaves = MeshBuilder.CreateSphere('leaves', { diameter: 2.5 }, scene);
        leaves.position = new Vector3(position.x, 3, position.z);
        const leavesMat = new StandardMaterial('leavesMat', scene);
        leavesMat.diffuseColor = new Color3(0.1, 0.4, 0.15);
        if (glowing) {
            leavesMat.emissiveColor = new Color3(0, 0.1, 0.05);
        }
        leaves.material = leavesMat;
    };

    const createQuestMarker = (scene: Scene, position: Vector3, id: string) => {
        const marker = MeshBuilder.CreateBox(`quest_${id}`, { size: 1 }, scene);
        marker.position = new Vector3(position.x, 1, position.z);
        const markerMat = new StandardMaterial(`quest_${id}Mat`, scene);
        markerMat.diffuseColor = new Color3(1, 0.8, 0);
        markerMat.emissiveColor = new Color3(0.5, 0.4, 0);
        marker.material = markerMat;

        // Floating animation
        scene.registerBeforeRender(() => {
            marker.position.y = 1 + Math.sin(Date.now() / 500) * 0.2;
            marker.rotation.y += 0.02;
        });
    };

    const checkInteractables = (scene: Scene, player: Mesh) => {
        let nearestTarget: string | null = null;
        let nearestDist = 5; // Interaction distance

        scene.meshes.forEach(mesh => {
            if (mesh.name.startsWith('portal_') ||
                mesh.name.startsWith('npc_') ||
                mesh.name === 'return_portal') {
                const dist = Vector3.Distance(player.position, mesh.position);
                if (dist < nearestDist) {
                    nearestDist = dist;
                    nearestTarget = mesh.name;
                }
            }
        });

        setInteractTarget(nearestTarget);
    };

    return (
        <>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />

            {/* Interaction prompt */}
            {interactTarget && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-black/70 px-4 py-2 rounded-lg text-white">
                    Nhấn <span className="font-bold text-yellow-400">E</span> để tương tác
                    {interactTarget.startsWith('portal_') && (
                        <span className="ml-2 text-green-400">
                            → {interactTarget.replace('portal_', 'Zone ')}
                        </span>
                    )}
                </div>
            )}
        </>
    );
}
