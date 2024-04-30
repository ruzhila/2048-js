const colorpalette = {
    0: '#6e5f74',
    2: '#00d0a4',
    4: '#dd7373',
    8: '#7d53de',
    16: '#6622cc',
    32: '#00bfb2',
    64: '#c06ff2',
    128: '#340068',
    256: '#3e92cc',
    512: '#d8315b',
    1024: '#1c0b19',
    2048: '#1c0b19'
}
class Game { // by ruzhila.cn
    constructor(ctx) {
        this.ctx = ctx;
        this.ctx.font = '40px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        window.addEventListener('keydown', (event) => {
            if (/Arrow/i.test(event.key) && event.key) {
                event.preventDefault()
                this.combind(event.key)
            }
        })
    }
    start() {
        this.ctx.clearRect(0, 0, 480, 480)
        this.board = new Array(4).fill(0).map(() => new Array(4).fill(0))
        this.addNumber()
        this.draw()
    }
    addNumber() {
        let available = this.board.flatMap((row, i) => row.map((v, j) => v === 0 ? [i, j] : null).filter(v => v !== null))
        if (available.length === 0) return;
        let [i, j] = available[Math.floor(Math.random() * available.length)]
        this.board[i][j] = 2;
        return [i, j]
    }
    combind(direction) {
        let mapping = {
            ArrowUp: [1, 1, 0, 1],
            ArrowDown: [],
            ArrowLeft: [],
            ArrowRight: [],
        }
        if (direction === 'ArrowUp') {
            for (let i = 1; i < this.board.length; i++) {
                for (let j = 0; j < this.board[i].length; j++) {
                    if (this.board[i][j] !== 0) {
                        let x = i
                        while (x > 0 && this.board[x - 1][j] === 0) {
                            x--
                        }
                        if (this.board[x - 1][j] === this.board[i][j]) {
                            this.board[x - 1][j] *= 2
                            this.board[i][j] = 0
                        } else {
                            this.board[x][j] = this.board[i][j]
                            if (x !== i) {
                                this.board[i][j] = 0
                            }
                        }
                    }
                }

            }
        }
        if (this.addNumber() == undefined) {
            document.getElementsByClassName('gameover')[0].style.display = 'block';
        }
        this.draw();
    }
    draw() {
        for (var i = 0; i < this.board.length; i++) {
            for (var j = 0; j < this.board[i].length; j++) {
                this.ctx.fillStyle = colorpalette[this.board[i][j]];
                this.ctx.fillRect(j * 120 + 5, i * 120 + 5, 110, 110);
                if (this.board[i][j] > 0) {
                    // draw text
                    this.ctx.fillStyle = '#fff';
                    this.ctx.fillText(this.board[i][j], j * 120 + 60, i * 120 + 60);
                }
            }
        }
    }
}