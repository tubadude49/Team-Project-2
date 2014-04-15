package com.threeC.beans;

import java.util.LinkedList;

public class OfferManager {
	public LinkedList<Offer> offers = new LinkedList<Offer>();
	
	public OfferManager() {
		
	}
	
	public void offer(Player source, Player target) {
		boolean found = false;
		for(int i=0;i<offers.size();i++) {
			Offer offer = offers.get(i);
			if((offer.source.uuid == source.uuid && offer.target.uuid == target.uuid)
			|| (offer.source.uuid == target.uuid && offer.target.uuid == source.uuid)) {
				offer.accept();
				offers.remove(i);
				found = true;
				break;
			}
		}
		if(!found) {
			offers.add(new Offer(source, target));			
		}
	}
	
	public void accept(Player source, Player target) {
		for(int i=0;i<offers.size();i++) {
			Offer offer = offers.get(i);			
			if(offer.source == source && offer.target == target) {
				offer.accept();
				offers.remove(i);
				break;
			}
		}
	}
	
	public void decline(Player source, Player target) {
		for(int i=0;i<offers.size();i++) {
			Offer offer = offers.get(i);			
			if(offer.source == source && offer.target == target) {
				offers.remove(i);
				break;
			}
		}
	}
	
}

class Offer {
	public Player source;
	public Player target;
	
	public Offer(Player source, Player target) {
		this.source = source;
		this.target = target;		
	}
	
	public void accept() {
		if(source.alliance < 0 && target.alliance < 0) {
			source.alliance = target.uuid;
			target.alliance = source.uuid;
		}
	}
}
