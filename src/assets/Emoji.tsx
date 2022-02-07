class Emoji {
    x: number;
    y: number;

    floor: number;
    ceiling: number;

    alive: boolean;
    increment: number;

    element: JSX.Element;

    constructor(startX: number, startY: number, floor: number, ceiling: number) {
        this.alive = true;
        this.x = startX;
        this.y = startY;
        this.floor = floor;
        this.ceiling = ceiling;

        this.increment = -Math.floor((Math.random() * ceiling) + 10)

        this.element = this.getElement();
    }

    getYIncrement() { // Falling down
        return -Math.floor((Math.random() * this.ceiling) + 10);
    }

    getXIncrement() { // Shooting across
        return Math.floor((Math.random() * 10) + 1);
    }

    getElement() {
        return <div style={{
                position: "absolute",
                fontSize: "12pt",
                transform: `translate(${this.x}px, ${this.y}px`}}>
            🍔
        </div>
    }

    refreshPosition() {
        if (this.alive) {
            this.y += this.getYIncrement();
            this.x += this.getXIncrement();

            this.increment += 0.25;

            if (this.y >= this.floor) {
                if (this.increment <=5) {
                    this.alive = false;
                }
                this.increment = -this.increment + 5;
            }
        }
    }
}

export default Emoji;