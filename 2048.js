const colorpalette = {
    0: '#6e5f74', 2: '#00d0a4', 4: '#dd7373', 8: '#7d53de', 16: '#6622cc', 32: '#00bfb2',
    64: '#c06ff2', 128: '#340068', 256: '#3e92cc', 512: '#d8315b', 1024: '#1c0b19', 2048: '#1c0b19'
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
        this.addNumberAndDraw()
    }
    addNumberAndDraw() {
        let available = this.board.flatMap((row, i) => row.map((v, j) => v === 0 ? [i, j] : null).filter(v => v !== null))
        if (available.length === 0) return;
        let [newI, newJ] = available[Math.floor(Math.random() * available.length)]
        this.board[newI][newJ] = 2
        for (var i = 0; i < this.board.length; i++) {
            for (var j = 0; j < this.board[i].length; j++) {
                this.ctx.fillStyle = colorpalette[this.board[i][j]];
                this.ctx.fillRect(j * 120 + 5, i * 120 + 5, 110, 110);
                if (this.board[i][j] > 0) {
                    this.ctx.fillStyle = '#fff';
                    this.ctx.fillText(this.board[i][j], j * 120 + 60, i * 120 + 60);
                }
            }
        }
        return [newI, newJ]
    }
    combind(direction) {
        let mergeX = (i, j, k) => {
            if (this.board[k][j] !== 0) {
                if (this.board[i][j] === 0) {
                    this.board[i][j] = this.board[k][j]
                    this.board[k][j] = 0
                } else if (this.board[i][j] === this.board[k][j]) {
                    this.board[i][j] *= 2
                    this.board[k][j] = 0
                }
            }
        }
        let mergeY = (i, j, k) => {
            if (this.board[i][k] !== 0) {
                if (this.board[i][j] === 0) {
                    this.board[i][j] = this.board[i][k]
                    this.board[i][k] = 0
                } else if (this.board[i][j] === this.board[i][k]) {
                    this.board[i][j] *= 2
                    this.board[i][k] = 0
                }
            }
        }
        if (direction === 'ArrowUp') {
            for (let i = 0; i < this.board.length; i++) {
                for (let j = 0; j < this.board[i].length; j++) {
                    for (let k = i + 1; k < this.board.length; k++) {
                        mergeX(i, j, k)
                    }
                }
            }
        } else if (direction === 'ArrowDown') {
            for (let i = this.board.length - 1; i >= 0; i--) {
                for (let j = 0; j < this.board[i].length; j++) {
                    for (let k = i - 1; k >= 0; k--) {
                        mergeX(i, j, k)
                    }
                }
            }
        } else if (direction === 'ArrowLeft') {
            for (let i = 0; i < this.board.length; i++) {
                for (let j = 0; j < this.board[i].length; j++) {
                    for (let k = j + 1; k < this.board[i].length; k++) {
                        mergeY(i, j, k)
                    }
                }
            }
        } else if (direction === 'ArrowRight') {
            for (let i = 0; i < this.board.length; i++) {
                for (let j = this.board[i].length - 1; j >= 0; j--) {
                    for (let k = j - 1; k >= 0; k--) {
                        mergeY(i, j, k)
                    }
                }
            }
        }
        if (this.addNumberAndDraw() == undefined) {
            document.getElementsByClassName('gameover')[0].style.display = 'block';
        }
    }
}