import { Server, Socket } from 'socket.io';

interface UserPresence {
    oderId: string;
    username: string;
    location: string;
    status: string;
}

export function setupPresenceNamespace(
    io: Server,
    onlineUsers: Map<string, UserPresence>
) {
    const presenceNamespace = io.of('/presence');

    presenceNamespace.on('connection', (socket: Socket) => {
        console.log('Presence client connected:', socket.id);

        let userId = '';
        let username = '';

        // Register user presence
        socket.on('register', (data: { userId: string; username: string }) => {
            userId = data.userId;
            username = data.username;

            onlineUsers.set(socket.id, {
                oderId: userId,
                username: username,
                location: 'hub',
                status: 'online',
            });

            // Notify others
            socket.broadcast.emit('user_online', {
                userId,
                username,
                location: 'hub',
            });

            // Send online count
            broadcastOnlineCount();

            console.log(`${username} is now online`);
        });

        // Update status
        socket.on('update_status', (data: { status: string }) => {
            const user = onlineUsers.get(socket.id);
            if (user) {
                user.status = data.status;
                onlineUsers.set(socket.id, user);

                socket.broadcast.emit('user_status_changed', {
                    userId: user.oderId,
                    status: data.status,
                    location: user.location,
                });
            }
        });

        // Update location
        socket.on('update_location', (data: { location: string }) => {
            const user = onlineUsers.get(socket.id);
            if (user) {
                user.location = data.location;
                onlineUsers.set(socket.id, user);

                socket.broadcast.emit('user_status_changed', {
                    userId: user.oderId,
                    status: user.status,
                    location: data.location,
                });

                broadcastOnlineCount();
            }
        });

        // Get friends status
        socket.on('get_friends_status', (friendIds: string[]) => {
            const friendsStatus: UserPresence[] = [];

            onlineUsers.forEach((user) => {
                if (friendIds.includes(user.oderId)) {
                    friendsStatus.push(user);
                }
            });

            socket.emit('friends_status', { friends: friendsStatus });
        });

        socket.on('disconnect', () => {
            const user = onlineUsers.get(socket.id);
            if (user) {
                console.log(`${user.username} went offline`);

                // Notify others
                presenceNamespace.emit('user_offline', {
                    userId: user.oderId,
                });

                onlineUsers.delete(socket.id);
                broadcastOnlineCount();
            }
        });

        function broadcastOnlineCount() {
            const counts = {
                hub: 0,
                z1: 0,
                z2: 0,
                z3: 0,
                z4: 0,
                total: onlineUsers.size,
            };

            onlineUsers.forEach((user) => {
                if (user.location in counts) {
                    (counts as any)[user.location]++;
                }
            });

            presenceNamespace.emit('online_count', counts);
        }
    });

    return presenceNamespace;
}
