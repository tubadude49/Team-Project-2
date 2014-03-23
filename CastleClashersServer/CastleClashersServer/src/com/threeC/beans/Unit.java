package com.threeC.beans;

import org.json.JSONObject;

public class Unit implements JSONStringifiable {
	public long uuid;
	
	public int xp;
	public int veterancy;
	
	public int health;
	public int upgrade;
	
	public int attack;
	public int defense;
	public int speed;
	
	public int x;
	public int y;
	
	public Object dest;
	public Player owner;
	public String type;
	
	protected Unit(int attack, int defense, int speed, String type, long uuid) {
		this.attack = attack;
		this.defense = defense;
		this.speed = speed;
		this.type = type;
		this.uuid = uuid;
	}
	
	@Override
	public String toString() {
		return toJSON();
	}

	@Override
	public String toJSON() {
		JSONObject json = new JSONObject(this, new String[] { "uuid", "x", "y", "health", "upgrade", "veterancy", "owner", "attack", "defense", "speed", "dest", "type" } );
		return json.toString();
	}

	@Override
	public void fromJSON(String json) {
		// TODO Auto-generated method stub
		
	}
	
	public void addXp(int xp) {
		this.xp += xp;
		// veterancy go here
	}
	
	public void takeDamage(int damage) {
		health -= damage;
	}
	
	public int attack() {
		return attack;
	}
	
	public int defense() {
		return defense;
	}
	
	public int speed() {
		return speed;
	}
	
	public long uuid() {
		return uuid;
	}
	
	public void setDest(Object target) {
	
	}

		
}
