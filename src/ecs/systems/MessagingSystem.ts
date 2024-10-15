import ECS from 'tnt-ecs';
import MessageBus from "../../core/MessageBus.ts";

export default class MessagingSystem extends ECS.System {

	postUpdate() {
		MessageBus.process();
	}
}
