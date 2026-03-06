export type WSEventType='scan_complete'|'alert_new'|'report_update'|'system_message'
export interface WSMessage{type:WSEventType;payload:unknown;timestamp:number}
export class WebSocketService{private ws:WebSocket|null=null;private handlers:Map<string,Function[]>=new Map();private reconnectAttempts=0;private maxReconnects=5
connect(url:string){try{this.ws=new WebSocket(url);this.ws.onmessage=(e)=>{const msg=JSON.parse(e.data)as WSMessage;this.emit(msg.type,msg.payload)};this.ws.onclose=()=>{if(this.reconnectAttempts<this.maxReconnects){setTimeout(()=>{this.reconnectAttempts++;this.connect(url)},1000*this.reconnectAttempts)}}}catch(e){console.error('WS error:',e)}}
on(event:string,handler:Function){if(!this.handlers.has(event))this.handlers.set(event,[]);this.handlers.get(event)!.push(handler)}
private emit(event:string,data:unknown){(this.handlers.get(event)||[]).forEach(h=>h(data))}
disconnect(){this.ws?.close();this.ws=null}}feat: add WebSocket service with auto-reconnect
