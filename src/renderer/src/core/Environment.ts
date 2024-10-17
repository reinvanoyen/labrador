import labra from "./labra.ts";
import useCodeStore from "../store/code.ts";
import Position from "../ecs/components/Position.ts";
import Disc from "../ecs/components/Disc.ts";
import Velocity from "../ecs/components/Velocity.ts";
import Target from "../ecs/components/Target.ts";
import Text from "../ecs/components/Text.ts";
import Wiggle from "../ecs/components/Wiggle.ts";
import MessageBus from "./MessageBus.ts";

export default class Environment {

	private static ecs;
	private static labra;

	static init(ecs, labra) {
		this.ecs = ecs;
		this.labra = labra;
		this.dependencies();
		MessageBus.addListener('run', () => {
			const {code} = useCodeStore.getState();
			this.run(code);
		});
	}

	static dependencies() {
		const position = new Position();
		const disc = new Disc();
		const velocity = new Velocity();
		const target = new Target();
		const text = new Text();
		const wiggle = new Wiggle();
	}

	static run(code) {
		labra.ecs = this.ecs;
		eval(code);
	}
}