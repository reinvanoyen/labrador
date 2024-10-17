import ECS from 'tnt-ecs';

export default class WiggleSystem extends ECS.System {

	test(entity) {
		return entity.components.position && entity.components.target && entity.components.wiggle;
	}

	enter(entity) {
		entity.wiggleFrame = 0;
		entity.wiggleDirection = 1;
	}

	update(entity) {

		const { target, wiggle } = entity.components;

		entity.wiggleFrame++;

		if (entity.wiggleFrame % wiggle.frequency === 0) {

			entity.wiggleDirection = entity.wiggleDirection === 1 ? -1 : 1;

			target.x = target.x + (wiggle.x * entity.wiggleDirection);
			target.y = target.y + (wiggle.y * entity.wiggleDirection);
		}
	}
}