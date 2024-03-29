import { _decorator, Component, Node, SpriteFrame, Sprite, Vec3} from 'cc';
import { Global } from './Global';
const { ccclass, property } = _decorator;

@ccclass('ScoreDisplay')
export class ScoreDisplay extends Component {
    @property([SpriteFrame])
    scoreSpriteFrames: SpriteFrame[] = [];

    private digitNodes: Node[] = [];

    start() {
        let maxDigitNum = 5;
        for (let i = 0; i < maxDigitNum; i++) {
            let node = new Node(`Digit ${i}`);
            node.addComponent(Sprite);
            node.setParent(this.node);
            this.digitNodes.push(node);
        }
        this.refreshScoreDisplay();
    }

    update(deltaTime: number) {
        
    }

    refreshScoreDisplay() {
        this.digitNodes.forEach((node) => {
            node.getComponent(Sprite).spriteFrame = null;
        });
        const w = this.scoreSpriteFrames[0].originalSize.width;
        const currentScoreDigitNum = Global.score.toString().length;
        let totalScoreWidth = currentScoreDigitNum * w;
        console.log(currentScoreDigitNum / 2);
        let beginX = -Math.floor(currentScoreDigitNum / 2) * w;
        if (totalScoreWidth % 2 == 1) {
            beginX -= Math.floor(w / 2);
        }
        Global.score.toString().split('').forEach((value, index) => {
            let digitNode = this.digitNodes[index];
            digitNode.getComponent(Sprite).spriteFrame = this.scoreSpriteFrames[parseInt(value)];
            digitNode.setPosition(new Vec3(beginX + index * w + Math.floor(w / 2), 0, 0));
        });
    }
}

