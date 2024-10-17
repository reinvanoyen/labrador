import ECS from 'tnt-ecs';
import { vec2 as Vector2 } from "gl-matrix";

/*

* TargetMovement
*
* This system is responsible for moving a position towards a target by velocity
*
* */
export default class TargetMovementSystem extends ECS.System {

	test(entity) {
		return entity.components.position && entity.components.target && entity.components.velocity;
	}

	update(entity) {

		let { velocity } = entity.components;

		let position = Vector2.fromValues(entity.components.position.x, entity.components.position.y);
		let target = Vector2.fromValues(entity.components.target.x, entity.components.target.y);
		let velocityVec = Vector2.fromValues(velocity.x, velocity.y);

		let desiredVelocity = Vector2.create();
		Vector2.subtract(desiredVelocity, target, position);
		let distance = Vector2.length(desiredVelocity);
		let normalizedDesiredVelocity = Vector2.create();
		Vector2.normalize(normalizedDesiredVelocity, desiredVelocity);

		let maxVelocity = Vector2.fromValues(velocity.max, velocity.max);
		let slowingRadius = velocity.slowingRadius;
		let mass = Vector2.fromValues(velocity.mass, velocity.mass);

		Vector2.normalize(desiredVelocity, desiredVelocity);

		if (distance < slowingRadius) {
			Vector2.multiply(normalizedDesiredVelocity, normalizedDesiredVelocity, maxVelocity);
			Vector2.scale(normalizedDesiredVelocity, normalizedDesiredVelocity, distance / slowingRadius);
			//desiredVelocity = desiredVelocity.normalize().mul(maxVelocity).mul(distance / slowingRadius);
		} else {
			Vector2.multiply(normalizedDesiredVelocity, normalizedDesiredVelocity, maxVelocity);
			//desiredVelocity = desiredVelocity.normalize().mul(maxVelocity);
		}

		let steering = Vector2.create();
		Vector2.subtract(steering, normalizedDesiredVelocity, velocityVec);
		Vector2.divide(steering, steering, mass);

		//let steering = desiredVelocity.sub(velocityVec).div(mass); // divide by mass
		//velocity = velocityVec.add(steering);
		let outputVelocity = Vector2.create();
		Vector2.add(outputVelocity, velocityVec, steering);

		entity.components.velocity.x = outputVelocity[0];
		entity.components.velocity.y = outputVelocity[1];
	}
}
