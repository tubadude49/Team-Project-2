package com.threeC.beans;

public class UnitFactory {
	
	public static Unit cavalry(long uuid) {
		return new Unit(1, 1, 1, "cavalry", uuid);
	}
	
	public static Unit infantry(long uuid) {
		return new Unit(1, 1, 1, "infantry", uuid);		
	}
	
	public static Unit cannon(long uuid) {
		return new Unit(1, 1, 1, "cannon", uuid);
	}		
}
