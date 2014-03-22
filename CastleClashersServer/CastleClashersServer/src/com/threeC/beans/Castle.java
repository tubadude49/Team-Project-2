package com.threeC.beans;

class Castle implements JSONStringifiable {
	private long uuid;
	
	private final XY pos;
	
	private int health;
	private int upgrade;
	
	public Castle(int x, int y) {
		pos = new XY(x,y);
	}
	
	@Override
	public String toJSON() {
		//TODO
		return "";
	}
	
	public long uuid() {
		return uuid;
	}
	
	public void takeDamage(int damage) {
		health -= damage;
	}
	
	public void upgrade() {
	
	}
	
}
