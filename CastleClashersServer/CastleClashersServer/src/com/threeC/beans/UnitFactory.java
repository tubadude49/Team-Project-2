package com.threeC.beans;

import java.util.LinkedList;

import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.api.WebSocketEngine;
import org.jwebsocket.packetProcessors.JSONProcessor;
import org.jwebsocket.server.TokenServer;

public class UnitFactory {
	
	public static void fromString(String type, long uuid, long owner, int x, int y, TokenServer server, LinkedList<Unit> deposit) {
		if( type.equals("cavalry") ) {
			new FactoryThread(new Unit(20, 8, 2, 15, 100, "cavalry", uuid, owner), x, y, deposit, server, 5000);
		} else if ( type.equals("infantry") ) {
			new FactoryThread(new Unit(40, 6, 2, 10, 150, "infantry", uuid, owner), x, y, deposit, server, 5000);
		} else if ( type.equals("cannon") ) {
			new FactoryThread(new Unit(80, 10, 2, 7, 50, "cannon", uuid, owner), x, y, deposit, server, 5000);
		}
	}
}

class FactoryThread extends Thread implements Runnable {
	int buildTime;	//ms
	LinkedList<Unit> deposit;
	TokenServer server;
	Unit newUnit;
	
	public FactoryThread(Unit newUnit, int x, int y, LinkedList<Unit> deposit, TokenServer server, int buildTime) {
		this.newUnit = newUnit;
		this.newUnit.x = x;
		this.newUnit.y = y;
		this.deposit = deposit;
		this.server = server;
		this.buildTime = buildTime;
		this.start();
	}
	
	@Override
	public void run() {
		while(buildTime > 0) {
			try {
				int sleep = buildTime > 100 ? 100 : buildTime;
				Thread.sleep(sleep);
				buildTime -= sleep;
				/*for(WebSocketEngine wse : server.getEngines().values()) {
					for(WebSocketConnector wsc : server.getConnectors(wse).values()) {
						server.sendToken(wsc, JSONProcessor.JSONStringToToken(newUnit.toJSON()));
					}
				}*/
			} catch (InterruptedException e) { e.printStackTrace();	}
		}
		newUnit.built = true;
		for(WebSocketEngine wse : server.getEngines().values()) {
			for(WebSocketConnector wsc : server.getConnectors(wse).values()) {
				server.sendToken(wsc, JSONProcessor.JSONStringToToken(newUnit.toJSON()));
			}
		}
		deposit.add(newUnit);
	}
}