

var puzzles = ['---------------123---123456--1--4--7--4--723---723-56--12-45-78-45-783---783--6--', '---------------123---123456--1--4--7--4--723---723-56--12-45-78-45-783--9--------', '---------------123---123456--1--4--7--4--723---723-56--12-45-78-45-783---783--6--', '---------------123---123456--1--4--7--4--723---723-56--12-45-78-45-783---783--6--', '---------------123---123456--1--4--7--4--723---723-56--12-45-78-459------78---6--', '---------------123---123456--1--4--7--4--723---723-56--12-45-78-459-----9-----6--', '---------------123---123456--1--4--7--4--723---723-56--12-45-78-459-----9--3-----', '---------------123---123456--1--4--7--4--723---723-56--12-45-78-459-----9-----6--', '---------------123---123456--1--4--7--4--723---723-56--12-45-78-459-----9--3-----', '---------------123---123456--1--4--7--4--723---723-56--12-45-78-459------78---6--', '---------------123---123456--1--4--7--4--723---723-56--12-45-78-459------78---6--', '---------------123---123456--1--4--7--4--723---723-56--12-45-78-459------78---6--', '---------------123---123456--1--4--7--4--723---723-56--12-45-78-459--3---783-----', '---------------123---123456--1--4--7--4--723---723-56--12-45-78-459--3---783-----', '---------------123---123456--1--4--7--4--723---723-56--12-45-78-459--3--9--------', '---------------123---123456--1--4--7--4--723---723-56--12-45-78-459--3--9--------', '---------------123---123456--1--4--7--4--723---723-56--12-45-78-459--3---783-----', '---------------123---123456--1--4--7--4--723---723-56--12-45-78-459--3---783-----', '---------------123---123456--1--4--7--4--723---723-56--12-45-78-459--3---783-----', '---------------123---123456--1--4--7--4--723---723-56--12-45-78-45-783---783--6--', '---------------123---123456--1--4--7--4--723---723-56--12-45-78-45-783--9--------', '---------------123---123456--1--4--7--4--723---723-56--12-45-78-45-783--9--------', '---------------123---123456--1--4--7--4--723---723-56--12-45-78-45-783---783--6--', '---------------123---123456--1--4--7--4--723---723-56--12-45-78-45-783---783--6--']




function RandomClues() {
	ClearBoard()
	numPuzzles = puzzles.length
	randPuzzle = puzzles[Math.floor(Math.random() * numPuzzles)]

	for (i = 0; i < randPuzzle.length; i++) {
		var cell_id = "cell" + i.toString()
		// console.log("cell id: ", cell_id, "idx: ", randPuzzle[i])
		if (randPuzzle[i] != '-') {
			var temp = document.getElementById(cell_id)
			temp.innerHTML = "<input id ='" + cell_id + "' type = 'text' value = '" + randPuzzle[i] + "' disabled/>"
		}
	}
}

function ClearBoard() {
	for (i = 0; i < 81; i++) {
		var cell_id = "cell" + i.toString()
		var temp = document.getElementById(cell_id)
		temp.innerHTML = "<input id ='" + cell_id + "' type = 'text' />"
	}
	return
}
// "<input type = 'text' name = 'txtNewInput' id = 'txtNewInput' value = '" + content + "'/>"





function GetCellValues() {
	var subarr = []
	var matrix = []
    var table = document.getElementById('sboard');
    for (var r = 0, n = table.rows.length; r < n; r++) {
        for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
            subarr.push(table.rows[r].cells[c].firstChild.value)
            // alert(arr)
            // alert(table.rows[r].cells[c].innerHTML)
        }
        matrix.push(subarr)
        subarr = []
        // alert(subarr)
    }
    // console.log(matrix)
    return matrix
}

board = GetCellValues()

function GenerateInputClauses(board) {
	var outstring = ""
	for (x = 0; x < board.length; x++) {
		for (y = 0; y < board[x].length; y++) {
			toClue = (((x * 81) + (y * 9)) + board[x][y]*1)
			outstring += toClue.toString() + " 0\n"
		}
	}
	// console.log(outstring)
	return outstring
}


function GenerateNegativeClauses(order) {
	var outstring = ""
	for (x = 0; x < Math.pow(order,2); x++) {
		for (y = 0; y < Math.pow(order, 2); y++) {
			for (a = 0; a < (Math.pow(order,2)) - 1; a++) {
				for (b = a + 1; b < Math.pow(order, 2); b++) {
					var var1 = (Math.pow(order,4))*x+(Math.pow(order, 2))*y+a+1
					var var2 = (Math.pow(order,4))*x+(Math.pow(order, 2))*y+b+1
					outstring += '-'+var1.toString()+' -'+var2.toString() + ' 0\n'
				}
			}
		}
	}
	return outstring
}

function GeneratePositiveClauses(order) {
	var outstring = ""
	// Rows
	for (a = 0; a < Math.pow(order, 2); a++) {
		for (x = 0; x < Math.pow(order, 2); x++) {
			var substr = ""
			for (y = 0; y < Math.pow(order, 2); y++) {
				substr += (Math.pow(order, 4)*x+(Math.pow(order, 2))*y+a+1).toString() + " "
			}
			outstring += substr+"0\n"
		}
	}
	// Cols
	for (a = 0; a < Math.pow(order, 2); a++) {
		for (y = 0; y < Math.pow(order, 2); y++) {
			var substr = ""
			for (x = 0; x < Math.pow(order, 2); x++) {
				substr += (Math.pow(order, 4)*x+(Math.pow(order, 2))*y+a+1).toString() + " "
			}
			outstring += substr+"0\n"
		}
	} 
	// Blocks
	for (a = 0; a < Math.pow(order, 2); a++) {
		for (band = 0; band < order; band++) {
			for (stack = 0; stack < order; stack++) {
				var substr = ""
				for (x = band*order; x < (band+1)*order; x++) {
					for (y = stack*order; y < (stack+1)*order; y++) {
						substr += (Math.pow(order, 4)*x+(Math.pow(order, 2))*y+a+1).toString() + " "
					}
				}
				outstring += substr+"0\n"
			}
		}
	}
	return outstring
}

function GenerateAllRules(order, board) {
	var returnstring = ""
	var pstring = GeneratePositiveClauses(order)
	returnstring += pstring
	var nstring = GenerateNegativeClauses(order)
	returnstring += nstring
	var instring = GenerateInputClauses(board)
	returnstring += instring
	// console.log(returnstring)
	return returnstring
}

function GenerateCNF(rules) {
	string = "p cnf 729 3240\n"
	string += rules
	return string
}

function SolveCNF(cnf) {
	var lines = cnf.split(/\r\n|\r|\n/)
	var numLines = lines.length
	var i = 1;
	var clauses = []
	var clause = []
	var redundant = false
	for (j = 0; j < 3240 && i < numLines; i++) {
		tokens = lines[i].split(/\s+/)
		for (k = 0; k < tokens.length; k++) {
			var literal = tokens[k]*1
			var idx = (literal < 0? -literal: literal)
			if (idx == 0 && k == tokens.length - 1) {
				if (!redundant) {
					clauses.push(clause)
				}
				clause = []
				redundant = false
				j++
				break
			}
			if (redundant) {
				continue
			}
			var repeat = false
			for (m = 0; m < clause.length; m++) {
				if (clause[m] == literal) {
					repeat = true
					break
				}
				if (clause[m] == -literal) {
					redundant = true
					break
				}
			}
			if (!repeat) {
				clause.push(literal)
			}
		} 
	}

	if (satSolve(729, clauses)) {
		return "Correct!"
	}
	else {
		return "Incorrect. Check and try again!"
	}
}


function AttemptSolve() {
	board = GetCellValues()
	rules = GenerateAllRules(3, board)
	cnf = GenerateCNF(rules)
	console.log(cnf)
	isSolution = SolveCNF(cnf)
	console.log(isSolution)
	var out = document.getElementById("correct")
	out.innerHTML = isSolution
	if (isSolution.indexOf('again') > 0) {
		document.getElementById("correct").style.color = "red"
	}
	else {
		document.getElementById("correct").style.color = "green"
	}

	
}


















