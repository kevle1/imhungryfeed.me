import { emojisplosion } from 'emojisplosion';


const emojis = ["🍕", "🍔", "🍟", "🌭", "🍿", "🥓", "🥚", "🍳", "🧇", "🥞", "🧈",
                "🍞", "🥐", "🥨", "🥯", "🥖", "🧀", "🥗", "🥙", "🥪", "🌮", "🌯",
                "🍱", "🥡", "🥠", "🥟", "🍠", "🥩", "🍗", "🍖", "🍘", "🍙", "🍚",
                "🍛", "🍜", "🦪", "🍣", "🍤", "🥣", "🍝", "🍲", "🥘", "🧆", "🍢",
                "🥮", "🍥", "🥧", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🍯",
                "🍮", "🍡", "🍭", "🍬", "🍫", "🧁", "🍵", "🍻", "🍺", "🍇", "🍎",
                "🥭", "🍍", "🍌", "🍋", "🍊", "🍉", "🍏", "🍐", "🍑", "🍒", "🍓",
                "🍅", "🍆", "🌽", "🧄", "🥔", "🥦", "🥬", "🥒", "🥑", "🍄", "🌶"]

function emojiExplode(id: string) {
    const element = document.getElementById(id);
    emojisplosion({
        position() {
        const offset = elementCentreLocation(element!);
        return {
            x: offset.left + element!.clientWidth / 2,
            y: offset.top + element!.clientHeight / 2,
        };
        },
        emojiCount: 80,
        physics: {
        fontSize: {
            max: 36,
            min: 18,
        },
        initialVelocities: {
            rotation: {
                max: 28,
                min: -28,
            },
            x: {
                max: 42,
                min: -42,
            },
            y: {
                max: 42,
                min: -42,
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