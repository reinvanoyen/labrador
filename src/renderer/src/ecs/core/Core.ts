"use strict";

import performance from './performance';

export default class Core {

	public systems;
	public entities;
	public entityLookup;
	public dirtyEntities;
	public updateCount;
	public lastUpdate;
	public isRunning;

	constructor() {
		this.systems = [];
		this.entities = [];
		this.entityLookup = {};
		this.dirtyEntities = [];
		this.updateCount = 0;
		this.lastUpdate = performance.now();
		this.isRunning = false;

		// Run the update loop
		this.updateLoop();
	}

	/**
	 * Adds the system from the ECS core
	 * @param system
	 */
	addSystem(system) {

		this.systems.push(system);
		system.core = this;

		let i = this.entities.length;

		while(i--) {
			if( system.test(this.entities[i]) ) {
				system.addEntity(this.entities[i]);
			}
		}
	}

	/**
	 * Removes the system from the ECS core
	 * @param system
	 */
	removeSystem(system) {

		const index = this.systems.indexOf(system);

		if (index !== -1) {
			system.core = null;
			this.systems.splice(index, 1);
		}
	}

	/**
	 * Find an entity by ID
	 * @param id
	 * @returns {*|null}
	 */
	findEntityById(id) {
		return this.entityLookup[id] || null;
	}

	/**
	 * Add an entity the ECS core
	 * @param entity
	 */
	addEntity(entity) {

		if (this.entities.indexOf(entity) === -1) {

			// Add the entity to the list of entities
			this.entities.push(entity);

			// Add the entity to the entity lookup table
			this.entityLookup[entity.id] = entity;

			// Assign the core to the entity
			entity.core = this;

			let i = this.systems.length;

			while(i--) {
				if(this.systems[i].test(entity)) {
					this.systems[i].addEntity(entity);
				}
			}
		}
	}

	/**
	 * Remove an entity from the ECS core
	 * @param entity
	 */
	removeEntity(entity) {

		const index = this.entities.indexOf(entity);

		if (index !== -1 ) {

			// Remove the entity from the entity list
			this.entities.splice(index, 1);

			// Remove the entity from the entity lookup table
			delete this.entityLookup[entity.id];

			// Remove entity from all systems
			let s = this.systems.length;
			while(s--) {
				this.systems[s].removeEntity(entity);
			}

			// Remove core assignment from entity
			entity.core = null;
		}
	}

	/**
	 * Update tick
	 */
	update() {

		const now = performance.now();
		const delta = now - this.lastUpdate;

		// First check the changes in the dirty entities
		let d = this.dirtyEntities.length;

		while(d--) {
			let s = this.systems.length;
			while(s--) {
				if(this.systems[s].test(this.dirtyEntities[d])) {
					this.systems[s].addEntity(this.dirtyEntities[d]);
				} else {
					this.systems[s].removeEntity(this.dirtyEntities[d]);
				}
			}
		}

		this.dirtyEntities = [];

		// Perform the update tick
		let i = this.systems.length;

		while(i--) {
			if (this.updateCount % this.systems[i].frequency === 0) {
				if (this.systems[i].isRunning) {
					let j = this.systems[i].entities.length;
					this.systems[i].preUpdate(delta);
					while(j--) {
						this.systems[i].update(this.systems[i].entities[j], delta);
					}
					this.systems[i].postUpdate(delta);
				}
			}
		}

		++this.updateCount;
		this.lastUpdate = now;
	}

	/**
	 * Start running the update loop
	 */
	start() {
		this.lastUpdate = performance.now();
		this.isRunning = true;
	}

	/**
	 * Stop running the update loop
	 */
	stop() {
		this.isRunning = false;
	}

	/**
	 * Run the update loop
	 */
	updateLoop() {
		if (this.isRunning) {
			this.update();
		}
		requestAnimationFrame(() => this.updateLoop());
	}
}