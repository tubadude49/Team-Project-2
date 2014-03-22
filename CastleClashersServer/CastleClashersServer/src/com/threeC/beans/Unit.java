package com.threeC.beans;

public class Unit implements JSONStringifiable {
	private long uuid;
	
	private int xp;
	private int veterancy;
	
	private int health;
	private int upgrade;
	
	private int attack;
	private int defense;
	private int speed;
	
	private XY pos;
	
	private Object dest;
	private Player owner;
	private String type;
	
	protected Unit(int attack, int defense, int speed, String type, long uuid) {
		this.attack = attack;
		this.defense = defense;
		this.speed = speed;
		this.type = type;
		this.uuid = uuid;
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
	public void setDest(Object target) {
	
	}

	@Override
	public String toJSON() {
		// TODO Auto-generated method stub
		return null;
	}
		
}
