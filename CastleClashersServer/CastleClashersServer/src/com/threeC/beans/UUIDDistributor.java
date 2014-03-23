package com.threeC.beans;

public class UUIDDistributor {
	long nextUUID = 0;
	
	public UUIDDistributor() {
		
	}
	
	public synchronized long next() {		
		return nextUUID++;
	}
}
