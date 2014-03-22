package com.threeC.beans;

import java.util.List;
import java.util.Set;

public class Player implements JSONStringifiable {
	private long uuid;
	
	private String name;
	private int gold;
	private int income;
	
	private Player alliance;
	private Player war;
	
	private List<Castle> castles;
	private List<Unit> units;
	
	private Set<Player> wars;
	
	private String sessionId;
	
	public Player(String name, String sessionId, long uuid) {
		this.name = name;
		this.sessionId = sessionId;
		this.uuid = uuid;
	}
	
	public String sessionId() {
		return sessionId;
	}
	
	@Override
	public String toJSON() {
		//TODO
		return "";
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String name() {
		return name;
	}
	
	public void incrGold() {
		gold += income;
	}
	
	public int gold() {
		return gold;
	}
	
	public void purchase(String unitType) {
		//check gold
	}
	
	public void moveUnit(String x, String y) {
		
	}
	
	public void upgrade(String target) {
		//check gold
	}
	
	public List<Castle> castles() {
		return castles;
	}
	
	public List<Unit> units() {
		return units;
	}
	
	public void ally(Player target) {
		
		//add all ally wars
	}
	
	public void backstab(Player target) {
		
		//remove all ally wars
	}
	
	public void war(Player target) {
		war = target;
		wars.add(war);
	}
	
	public void peace() {		
		
		//remove alliance member from wars from this war
		
		war = null;
	}
}
