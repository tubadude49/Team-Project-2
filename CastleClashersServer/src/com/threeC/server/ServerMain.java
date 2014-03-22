package com.threeC.server;

import org.json.JSONException;
import org.json.JSONObject;
import org.jwebsocket.factory.JWebSocketFactory;
import org.jwebsocket.server.TokenServer;
import org.jwebsocket.token.Token;
import org.jwebsocket.kit.WebSocketServerEvent;
import org.jwebsocket.listener.WebSocketServerTokenEvent;
import org.jwebsocket.listener.WebSocketServerTokenListener;
import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.api.WebSocketEngine;
import org.jwebsocket.api.WebSocketPacket;
import org.jwebsocket.config.JWebSocketConfig;
import org.jwebsocket.instance.JWebSocketInstance;
import org.jwebsocket.packetProcessors.JSONProcessor;

class JWebSocketListener implements WebSocketServerTokenListener {	
	
	@Override
	public void processOpened(WebSocketServerEvent event) {		
		System.out.println("Connection Opened");
	}
	
	@Override
	public void processPacket(WebSocketServerEvent event, WebSocketPacket packet) {
		try {
			JSONObject o = JSONProcessor.tokenToJSON(JSONProcessor.packetToToken(packet));
			System.out.println("Packet: " + o.toString());			
		} catch (JSONException e) {
			e.printStackTrace();
		}			
	}
	
	@Override
	public void processClosed(WebSocketServerEvent event) {
		System.out.println("Connection Closed");
	}
	
	@Override
	public void processToken(WebSocketServerTokenEvent event, Token token){  
		System.out.println("Token: " + token.toString());
	} 
}

public class ServerMain {
	public static void main(String[] args){
		JWebSocketFactory.printCopyrightToConsole();
		JWebSocketConfig.initForConsoleApp(args);
		JWebSocketFactory.start();
		TokenServer server = (TokenServer)JWebSocketFactory.getServer("ts0");
		
		assert server != null;

		server.addListener(new JWebSocketListener());		
		while (JWebSocketInstance.getStatus() != JWebSocketInstance.SHUTTING_DOWN){
			try {
				for(WebSocketEngine wse : server.getEngines().values()) {
					for(WebSocketConnector wsc : server.getConnectors(wse).values()) {
						JSONObject o = new JSONObject();
						try {
							o.put("the", 1000);
						} catch (JSONException e) {
							e.printStackTrace();
						}						
						server.sendToken(wsc, JSONProcessor.JSONStringToToken(o.toString()));
					}
				}
				Thread.sleep(1000);
			} catch (InterruptedException e) {}
		}
		System.out.println("Server shutting down...");
	}
}