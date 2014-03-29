package com.threeC.beans;

import java.util.LinkedList;

import org.json.JSONObject;

public class Battle implements JSONStringifiable {
	public long uuid;
	public int x;
	public int y;

	public LinkedList<Unit> blufor = new LinkedList<Unit>();
	public LinkedList<Unit> opfor = new LinkedList<Unit>();
		
	public Battle(int x, int y, long uuid){
		this.x = x;
		this.y = y;
		this.uuid = uuid;
	}
	
	public void addBlufor(Unit unit) {
		if(unit.battle < 0) {
			unit.battle = this.uuid;
			blufor.add(unit);
		}		
	}
	
	public void addOpfor(Unit unit) {
		if(unit.battle < 0) {
			unit.battle = this.uuid;
			opfor.add(unit);
		}
	}
	
	public void processBattleFrame() {
		for(int i=0;i<Math.min(opfor.size(),blufor.size());i++) {
			opfor.get(i).takeDamage(blufor.get(i).attack);
			blufor.get(i).takeDamage(opfor.get(i).attack);
			if(i+1 >= Math.min(opfor.size(),blufor.size())) {
				for(int j=i+1;j<opfor.size();j++) {
					blufor.get(i).takeDamage(opfor.get(j).attack);
				}
				for(int j=i+1;j<blufor.size();j++) {
					opfor.get(i).takeDamage(blufor.get(j).attack);
				}
			}
		}	
		
		for(int i=0;i<blufor.size();i++) {
			Unit unit = blufor.get(i);
			if(unit.health <= 0) {
				blufor.remove(i);
				i--;
			}
		}
		for(int i=0;i<opfor.size();i++) {
			Unit unit = opfor.get(i);
			if(unit.health <= 0) {
				opfor.remove(i);
				i--;
			}			
		}
	}
	
	public void attack(Unit attacker, Unit target) {
		
	}
	
	public void defend(Unit defender) {
		
	}
	
	public void flee(Player fleer) {
		
	}

	@Override
	public String toJSON() {
		JSONObject json = new JSONObject(this, new String[] { "uuid", "x", "y" } );
		return json.toString();
	}

	@Override
	public void fromJSON(String json) {
		// TODO Auto-generated method stub
		
	}
}
