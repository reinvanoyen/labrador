import { vec2 as Vector2 } from "gl-matrix";
import System from "../core/System.ts";

/*

* Movement
*
* Adds velocity to position
*
* */
export default class MovementSystem extends System {

	test(entity) {
		return entity.components.position && entity.components.velocity;
	}

	update(entity) {

		const position = Vector2.fromValues(entity.components.position.x, entity.components.position.y);

		Vector2.add(position, position, Vector2.fromValues(entity.components.velocity.x, entity.components.velocity.y));

		entity.components.position.x = position[0];
		entity.components.position.y = position[1];
	}
}