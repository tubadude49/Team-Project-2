package com.threeC.beans;

import java.util.List;

public class Battle implements JSONStringifiable {
	long uuid;
	XY pos;

	List<Unit> units;
	
	public Battle(XY pos){
		
	}
	
	public void attack(Unit attacker, Unit target) {
		
	}
	
	public void defend(Unit defender) {
		
	}
	
	public void flee(Player fleer) {
		
	}

	@Override
	public String toJSON() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void fromJSON(String json) {
		// TODO Auto-generated method stub
		
	}
}
