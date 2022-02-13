import { emojisplosion } from 'emojisplosion';


const emojis = ["🍕", "🍔", "🍟", "🌭", "🍿", "🥓", "🥚", "🍳", "🧇", "🥞", "🧈",
                "🍞", "🥐", "🥨", "🥯", "🥖", "🧀", "🥗", "🥙", "🥪", "🌮", "🌯",
                "🍱", "🥡", "🥠", "🥟", "🍠", "🥩", "🍗", "🍖", "🍘", "🍙", "🍚",
                "🍛", "🍜", "🦪", "🍣", "🍤", "🥣", "🍝", "🍲", "🥘", "🧆", "🍢",
                "🥮", "🍥", "🥧", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🍯",
                "🍮", "🍡", "🍭", "🍬", "🍫", "🧁", "🍵", "🍻", "🍺", "🍇"]

function emojiExplode(id: string, width: number) {
    const element = document.getElementById(id);
    const emojiCount = width > 600 ? 28 : 10; // Reduce emojis shown on mobile for performance

    emojisplosion({
        position() {
        const offset = elementCentreLocation(element!);
        return {
            x: offset.left + element!.clientWidth / 2,
            y: offset.top + element!.clientHeight / 2,
        };
        },
        emojiCount: emojiCount,
        physics: {
        fontSize: {
            max: 42,
            min: 36,
        },
        initialVelocities: {
            rotation: {
                max: 24,
                min: -24,
            },
            x: {
                max: 36,
                min: -36,
            },
            y: {
                max: 36,
                min: -36,
            },
        }
        },
        emojis: emojis
    });
}

var elementCentreLocation = function(element: any) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent!;
    } while(element);
    return {
        top: top,
        left: left
    };
};

export default emojiExplode;