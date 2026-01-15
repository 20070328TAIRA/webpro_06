const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});


let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
];

let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"東京メトロ日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"東京メトロ有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', {data: station2} );
});

app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_detail', {data: detail} );
});

app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db1', { data: station });
});


app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push( newdata );
});




app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

let char = [
  { id:1, name:"ミッキーマウス"},
  { id:2, name:"ミニーマウス"},
  { id:3, name:"ドナルドダック"},
  { id:4, name:"デイジーダック"},
  { id:5, name:"チップ"},
  { id:6, name:"デール"},
];

let char2 = [
  { id:1, name:"ミッキーマウス", birthday:"11月18日", height:"96.5", voice:"星野貴紀"},
  { id:2, name:"ミニーマウス", birthday:"11月18日", height:"96.5", voice:"遠藤綾"},
  { id:3, name:"ドナルドダック", birthday:"6月9日", height:"105.0", voice:"山寺宏一"},
  { id:4, name:"デイジーダック", birthday:"1月9日", height:"105.0", voice:"土井美加"},
  { id:5, name:"チップ", birthday:"4月2日", height:"95.0", voice:"滝沢ロコ"},
  { id:6, name:"デール", birthday:"4月2日", height:"95.0", voice:"稲葉実"},
];

// キャラクター一覧ページ
app.get("/char", (req, res) => {
  res.render('char', {data: char2});
});

// キャラクター詳細ページ
app.get("/char/:number", (req, res) => {
  const number = req.params.number;
  const detail = char2[number];
  res.render('char_detail', { data: detail });
});

// 入力画面を表示する
app.get("/char_add_page", (req, res) => {
  res.sendFile(__dirname + "/views/char_add.html");
});

// データを追加する処理
app.get("/char_add", (req, res) => {
  let newdata = {
    id: Number(req.query.id),
    name: req.query.name,
    birthday: req.query.birthday,
    height: req.query.height,
    voice: req.query.voice
  };
  
  // 配列(char2)に新しいデータを追加
  char2.push(newdata);
  
  // 追加が終わったら一覧画面に自動で戻る（リダイレクト）
  res.redirect("/char");
});

// --- 削除機能 ---
app.get("/char_del/:number", (req, res) => {
  const number = req.params.number;
  // 配列から指定した番目の要素を1つ削除する
  char2.splice(number, 1);
  res.redirect("/char");
});

// --- 編集画面の表示 ---
app.get("/char_edit_page/:number", (req, res) => {
  const number = req.params.number;
  const detail = char2[number];
  // 編集対象のデータと、そのインデックス番号を渡す
  res.render('char_edit', { data: detail, index: number });
});

// --- データの更新処理 ---
app.get("/char_update", (req, res) => {
  const index = req.query.index;
  // 送られてきた内容で配列の中身を書き換える
  char2[index] = {
    id: Number(req.query.id),
    name: req.query.name,
    birthday: req.query.birthday,
    height: req.query.height,
    voice: req.query.voice
  };
  res.redirect("/char");
});




let movie = [
  { id:1, name:"白雪姫"},
  { id:2, name:"シンデレラ"},
  { id:3, name:"アラジン"},
  { id:4, name:"リトル・マーメイド"},
  { id:5, name:"美女と野獣"},
  { id:6, name:"ライオン・キング"},
  { id:7, name:"アナと雪の女王"},
  { id:8, name:"ズートピア"},
  { id:9, name:"トイ・ストーリー"},
];

let movie2 = [
  { id:1, name:"白雪姫", birthday:"1950年9月26日", time:"83", next:"なし"},
  { id:2, name:"シンデレラ", birthday:"1952年3月7日", time:"75", next:"シンデレラⅡ，シンデレラⅢ戻された時計の針"},
  { id:3, name:"アラジン", birthday:"1993年8月7日", time:"90", next:"アラジン〜ジャファーの逆襲〜，アラジン完結編〜盗賊王の伝説〜，実写版アラジン"},
  { id:4, name:"リトル・マーメイド", birthday:"1991年7月21日", time:"83", next:"リトル・マーメイドⅡ〜Return to The Sea〜，リトル・マーメイドⅢ〜はじまりの物語〜，実写版リトル・マーメイド"},
  { id:5, name:"美女と野獣", birthday:"1992年9月23日", time:"91", next:"美女と野獣〜ベルの素敵なプレゼント〜，美女と野獣〜ベルのファンタジーワールド〜，実写版美女と野獣"},
  { id:6, name:"ライオン・キング", birthday:"1994年7月23日", time:"88", next:"ライオン・キング２，ライオン・キング３，実写版ライオン・キング"},
  { id:7, name:"アナと雪の女王", birthday:"2014年3月14日", time:"102", next:"アナと雪の女王２"},
  { id:8, name:"ズートピア", birthday:"2016年4月23日", time:"108", next:"ズートピア２"},
  { id:9, name:"トイ・ストーリー", birthday:"1996年3月23日", time:"81", next:"トイ・ストーリー２，トイ・ストーリー３，トイ・ストーリー４"},
];


// 一覧ページ
app.get("/movie", (req, res) => {
  res.render('movie', {data: movie2});
});

// 詳細ページ
app.get("/movie/:number", (req, res) => {
  const number = req.params.number;
  const detail = movie2[number];
  res.render('movie_detail', { data: detail });
});

// 入力画面を表示する
app.get("/movie_add_page", (req, res) => {
  res.sendFile(__dirname + "/views/movie_add.html");
});

// データを追加する処理
app.get("/movie_add", (req, res) => {
  let newdata = {
    id: Number(req.query.id),
    name: req.query.name,
    birthday: req.query.birthday,
    time: req.query.time,
    next: req.query.next
  };
  
  // 配列(char2)に新しいデータを追加
  movie2.push(newdata);
  
  // 追加が終わったら一覧画面に自動で戻る（リダイレクト）
  res.redirect("/movie");
});

// --- 削除機能 ---
app.get("/movie_del/:number", (req, res) => {
  const number = req.params.number;
  // 配列から指定した番目の要素を1つ削除する
  movie2.splice(number, 1);
  res.redirect("/movie");
});

// --- 編集画面の表示 ---
app.get("/movie_edit_page/:number", (req, res) => {
  const number = req.params.number;
  const detail = movie2[number];
  // 編集対象のデータと、そのインデックス番号を渡す
  res.render('movie_edit', { data: detail, index: number });
});

// --- データの更新処理 ---
app.get("/movie_update", (req, res) => {
  const index = req.query.index;
  // 送られてきた内容で配列の中身を書き換える
  movie2[index] = {
    id: Number(req.query.id),
    name: req.query.name,
    birthday: req.query.birthday,
    time: req.query.time,
    next: req.query.next
  };
  res.redirect("/movie");
});





let park = [
  { id:1, name:"ディズニーランド・リゾート"},
  { id:2, name:"ウォルト・ディズニー・ワールド・リゾート"},
  { id:3, name:"東京ディズニーリゾート"},
  { id:4, name:"ディズニーランド・パリ"},
];

let park2 = [
  { id:1, name:"ディズニーランド・リゾート", birthday:"1955年7月17日", kuni:"アメリカ・カリフォルニア", etc:"世界初のディズニーリゾート"},
  { id:2, name:"ウォルト・ディズニー・ワールド・リゾート", birthday:"1971年10月1日", kuni:"アメリカ・フロリダ", etc:"150個以上のアトラクションがあり、東京ディズニーリゾートの約50倍以上の広さ"},
  { id:3, name:"東京ディズニーリゾート", birthday:"1983年4月15日", kuni:"日本", etc:"2001年に海をテーマにしたディズニーシーが開園した"},
  { id:4, name:"ディズニーランド・パリ", birthday:"1992年4月12日", huni:"フランス", etc:"眠れる森の美女の城がシンボルになっている"},
];


// 一覧ページ
app.get("/park", (req, res) => {
  res.render('park', {data: park2});
});

// 詳細ページ
app.get("/park/:number", (req, res) => {
  const number = req.params.number;
  const detail = park2[number];
  res.render('park_detail', { data: detail });
});

// 入力画面を表示する
app.get("/park_add_page", (req, res) => {
  res.sendFile(__dirname + "/views/park_add.html");
});

// データを追加する処理
app.get("/park_add", (req, res) => {
  let newdata = {
    id: Number(req.query.id),
    name: req.query.name,
    birthday: req.query.birthday,
    kuni: req.query.kuni,
    etc: req.query.etc
  };
  
  // 配列(char2)に新しいデータを追加
  park2.push(newdata);
  
  // 追加が終わったら一覧画面に自動で戻る（リダイレクト）
  res.redirect("/park");
});

// --- 削除機能 ---
app.get("/park_del/:number", (req, res) => {
  const number = req.params.number;
  // 配列から指定した番目の要素を1つ削除する
  park2.splice(number, 1);
  res.redirect("/park");
});

// --- 編集画面の表示 ---
app.get("/park_edit_page/:number", (req, res) => {
  const number = req.params.number;
  const detail = park2[number];
  // 編集対象のデータと、そのインデックス番号を渡す
  res.render('park_edit', { data: detail, index: number });
});

// --- データの更新処理 ---
app.get("/park_update", (req, res) => {
  const index = req.query.index;
  // 送られてきた内容で配列の中身を書き換える
  park2[index] = {
    id: Number(req.query.id),
    name: req.query.name,
    birthday: req.query.birthday,
    kuni: req.query.kuni,
    etc: req.query.etc
  };
  res.redirect("/park");
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));
