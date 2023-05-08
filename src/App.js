import { useState } from "react";
import './App.css'

function findBiggestArea(square) {
  let biggestColor = null;
  let biggestArea = 0;

  for (let i = 0; i < square.length; i++) {
    for (let j = 0; j < square[i].length; j++) {
      const color = square[i][j];
      const area = findColorArea(square, i, j, color);
      if (area > biggestArea) {
        biggestArea = area;
        biggestColor = color;
      }
    }
  }

  return { color: biggestColor, area: biggestArea };
}

function findColorArea(square, row, col, color) {
  if (
    row < 0 ||
    row >= square.length ||
    col < 0 ||
    col >= square[row].length ||
    square[row][col] !== color
  ) {
    return 0;
  }

  square[row][col] = null;
  let area = 1;

  area += findColorArea(square, row + 1, col, color);
  area += findColorArea(square, row - 1, col, color);
  area += findColorArea(square, row, col + 1, color);
  area += findColorArea(square, row, col - 1, color);

  return area;
}

const Generate = () => {
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);
  const [colors, setColors] = useState();
  const [totalCells, setTotalCells] = useState();
  const [squareArr, setsquareArr] = useState([])
  const [colorsArr, setColorsArr] = useState([])

  const { color, area } = findBiggestArea(squareArr);


  function handleSubmit(e) {
    e.preventDefault();
    print(columns, rows)
    colorGenerate(colors);
    
  }
  function print(w, h) {
    setTotalCells(w * h);
    const arr = Array(w * h).fill(0)
    setsquareArr(arr)
  }

  let newcoloarr = [];
  function colorGenerate(noOfColors) {

    for (let i = 1; i <= noOfColors; i++) {
      const generatedColor = gen();
      newcoloarr.push(generatedColor)
    }

    function gen() {
      let hexColor = '#';
      let selectHex = '0123456789ABCDEF'
      for (let i = 1; i <= 6; i++) {
        const myColor = selectHex.charAt(Math.floor(Math.random() * 15));
        hexColor += myColor;
      }
      return hexColor
    }
    setColorsArr(newcoloarr)
  }

 

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <fieldset>
          <legend>Data for Square</legend>
          <label>No of Columns:</label>
          <input type="number" name="cols" onChange={(e) => setColumns(e.target.value)} />
          <label>No of rows:</label>
          <input type="number" name="rows" onChange={(e) => setRows(e.target.value)} />
          <label>No of colors:</label>
          <input type="number" name="colors" onChange={(e) => setColors(e.target.value)} />
        </fieldset>
        <input type="submit" value="generate" />
      </form>

      {/* Printing SQUARE */}
      <h4 style={{ textAlign: 'center' }}>Square</h4>
      <div style={{
        display: 'grid', gridTemplateColumns: `repeat(${columns},80px)`, width: '980px', fontWeight: 'bold',
        gridTemplateRows: `repeat(${rows},100px)`, margin: '0 auto'
      }}>
        {squareArr.map((_, index) => {
          return (
            <div key={index} style={{ border: '1px solid white', backgroundColor: `${colorsArr[Math.floor(Math.random() * colorsArr.length)]}` }}>
              {index + 1}
            </div>
          )
        })}
      </div>
      <div>Biggest area: {area} cells with color {color}</div>
    </>
  )

}

function App() {
  return (
    <div>
      <Generate />
    </div>
  );
}

export default App;

