export class Puissance4 {

    constructor(element_id, rows, cols, p1, p2) {
        this.element_id = element_id;
        this.rows = rows;
        this.cols = cols;
        this.players = [
            { id: 1, color: p1 },
            { id: 2, color: p2 }
        ];
        this.scores = [];
        this.lancement();
    }

    lancement() {
        this.fin = false;
        this.turn = 1; 
        this.moves = 0;
        this.board = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
        this.affichage();
        this.jeu();
    }

    affichage() {
        this.element = document.querySelector(this.element_id);
        this.element.addEventListener('click', this.handle_click.bind(this));

        this.infoDiv = document.querySelector('#game-info') || document.createElement('div');
        this.infoDiv.id = 'game-info';
        if (!document.querySelector('#game-info')) {
            this.element.parentNode.insertBefore(this.infoDiv, this.element.nextSibling);
        }

        this.joueurs();
    }

    joueurs() {
        const currentPlayer = this.players.find(player => player.id === this.turn);
        if (currentPlayer) {
            this.infoDiv.textContent = 'Joueur en cours : Joueur ' + currentPlayer.id + ' Couleur: ' + currentPlayer.color;
        }
    }

    jeu() {
        let table = document.createElement('table');
        for (let i = 0; i < this.rows; i++) {
            let tr = document.createElement('tr');
            for (let j = 0; j < this.cols; j++) {
                let td = document.createElement('td');
                td.dataset.column = j;
                const cellState = this.board[i][j];
                if (cellState !== 0) {
                    const playerColor = this.players.find(player => player.id === cellState).color;
                    td.dataset.player = cellState;
                    td.classList.add(`player${cellState}`);
                    td.style.backgroundColor = playerColor;
                    if (this.latestMove && this.latestMove.row === i && this.latestMove.column === j) {
                        td.classList.add('playerSlideIn');
                    }
                }
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        this.element.innerHTML = '';
        this.element.appendChild(table);
    }

    play(column) {
        if (this.fin) {
            alert("Veuillez relancer une partie si vous voulez rejouer !");
            return;
        }
        let row;
        for (let i = 0; i < this.rows; i++) {
            if (this.board[i][column] === 0) {
                row = i;
            } else {
                break;
            }
        }
        if (row === undefined) {
            return;
        }
    
        this.board[row][column] = this.turn;
        this.moves++;
    
        this.latestMove = { row, column };
    
        this.jeu();
    
        if (this.gagnant(row, column)) {
            setTimeout(() => alert('Le Joueur ' + this.turn + ' a gagné !'), 10);
            this.reset();
            return;
        } else if (this.moves === this.rows * this.cols) {
            setTimeout(() => alert("Match nul !"), 10);
            this.reset();
            return;
        }
    
        this.turn = this.turn === this.players[0].id ? this.players[1].id : this.players[0].id;
        this.joueurs(); 
    }    
    
    gagnant(row, column) {
        const player = this.board[row][column];
    
        let count = 1;
        for (let i = column - 1; i >= 0 && this.board[row][i] === player; i--) {
            count++;
        }
        for (let i = column + 1; i < this.cols && this.board[row][i] === player; i++) {
            count++;
        }
        if (count >= 4) {
            return true;
        }
    
        count = 1;
        for (let i = row - 1; i >= 0 && this.board[i][column] === player; i--) {
            count++;
        }
        for (let i = row + 1; i < this.rows && this.board[i][column] === player; i++) {
            count++;
        }
        if (count >= 4) {
            return true;
        }
    
        count = 1;
        for (let i = row - 1, j = column - 1; i >= 0 && j >= 0 && this.board[i][j] === player; i--, j--) {
            count++;
        }
        for (let i = row + 1, j = column + 1; i < this.rows && j < this.cols && this.board[i][j] === player; i++, j++) {
            count++;
        }
        if (count >= 4) {
            return true;
        }
    
        count = 1;
        for (let i = row - 1, j = column + 1; i >= 0 && j < this.cols && this.board[i][j] === player; i--, j++) {
            count++;
        }
        for (let i = row + 1, j = column - 1; i < this.rows && j >= 0 && this.board[i][j] === player; i++, j--) {
            count++;
        }
        if (count >= 4) {
            return true;
        }
    
        return false;
    }

    handle_click(event) {
        const column = event.target.dataset.column;
        if (column !== undefined) {
            this.play(parseInt(column));
        }
    }

    reset() {
        this.fin = true;
        //this.scores.push(player.id);
        const Rejouer = document.createElement('button');
        Rejouer.textContent = 'Rejouer';
        document.body.appendChild(Rejouer);

        Rejouer.addEventListener('click', () => {
            Rejouer.style.display = 'none';
            this.fin = false;
            this.moves = 0;
            this.board = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
            this.joueurs();
            this.jeu();
        });
    }
}