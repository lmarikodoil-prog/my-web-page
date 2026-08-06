/* 
Meteor Catcher Game (5 objects + karaage version)
Sample Project
By GWC Curriculum Team
Move your mouse over a falling meteor to catch it! 
Watch out for the falling karaage — catching it costs you 5 points!
*/

/* GLOBAL VARIABLES */
let NUM_METEORS = 5; // 降ってくるオブジェクトの数
let meteors = []; // オブジェクトの情報(x, y, diameter, speed, type)をまとめて入れる配列
let catcherDiameter = 40; // Store diameter of catcher
let score;
let bgImage;
let starImage;
let karaageImage;
let gameCleared = false; // クリア状態を管理するフラグ

// karaageが出現する確率(0〜1)。0.25なら25%の確率で星の代わりに唐揚げになる
let KARAAGE_CHANCE = 0.25;

// Only runs once
function setup() {
  createCanvas(400, 400);
  bgImage = loadImage('1652436412785_filtered.JPG');
  starImage = loadImage('moko sit side.png');
  karaageImage = loadImage('karaage.png'); // 唐揚げの画像を読み込む

  resetGame(); // ゲーム初期化
}

// Runs over and over in a loop
function draw() {
  // Set background and remove outlines
  imageMode(CORNER);
  background(bgImage);
  noStroke();

  // クリアしていない間だけオブジェクトを描画・落下・判定する
  if (!gameCleared) {
    // 配列とforループで5つのオブジェクトをまとめて処理
    for (let i = 0; i < meteors.length; i++) {
      let m = meteors[i];

      // typeに応じて表示する画像を切り替える(星 or 唐揚げ)
      let img = (m.type === 'karaage') ? karaageImage : starImage;
      image(img, m.x, m.y, m.diameter, m.diameter);

      // Make the object fall
      m.y = m.y + m.speed;

      // Determine the distance between this object and the catcher
      let distance = dist(m.x, m.y, mouseX, mouseY);

      // Test to see if object and catcher have intersected
      if (distance <= (m.diameter + catcherDiameter) / 2) {
        if (m.type === 'karaage') {
          score = score - 5; // 唐揚げをキャッチしたらマイナス5点
        } else {
          score = score + 1; // 星をキャッチしたら+1点
        }
        resetMeteor(i); // このオブジェクトだけリセット
      }

      // Test to see if object has intersected with bottom wall
      if (m.y > height) {
        resetMeteor(i);
      }
    }
  }

  // Draw the catcher to follow the mouse
  fill(255, 255, 255, 100);
  ellipse(mouseX, mouseY, catcherDiameter, catcherDiameter);

  // --- スコアを表示する ---
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text("スコア: " + score, 10, 10);

  // 5点以上でステージクリアを表示
  if (score >= 5) {
    gameCleared = true; // これでdraw()内のif(!gameCleared)によりimageが消える

    textAlign(CENTER, CENTER);

    // クリアテキスト
    fill(255, 215, 0); // 金色
    textSize(50);
    text("Stage 1 Clear!", width / 2, height / 2 - 20);

    // 案内テキスト
    fill(255);
    textSize(30);
    text("画面クリックで再スタート", width / 2, height / 2 + 30);

    // クリックされたら再スタート
    if (mouseIsPressed) {
      resetGame();
    }
  }
}

// Helper function to reset a single object by index
function resetMeteor(i) {
  meteors[i].y = 0;
  meteors[i].x = random(0, width);
  meteors[i].speed = random(0.5, 4);
  meteors[i].diameter = random(10, 30);

  // 一定の確率で唐揚げ、それ以外は星にする
  meteors[i].type = (random(1) < KARAAGE_CHANCE) ? 'karaage' : 'star';
}

// ゲーム全体を初期化する関数
function resetGame() {
  score = 0;
  gameCleared = false;

  // 配列を空にしてから、forループで5つのオブジェクトを作り直す
  meteors = [];
  for (let i = 0; i < NUM_METEORS; i++) {
    meteors.push({
      x: random(width),
      y: random(-400, 0), // 開始位置を少しずらして、バラバラに降ってくるようにする
      diameter: random(5, 200),
      speed: random(0.5, 4),
      type: (random(1) < KARAAGE_CHANCE) ? 'karaage' : 'star'
    });
  }
}