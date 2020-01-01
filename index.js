function main () {
  fetchUserInfo('nakajima1412')
    .then((userInfo) => createView(userInfo))
    .then((view) => displayView(view))
    .catch((error) => {
      // Promise チェーンで発生したエラーを受け取る
      console.error('エラーが発生しました (${error})');
    });
}

function fetchUserInfo (userId) {
  // fetchの戻り値のPromiseをreturnする
  fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
    .then(response => {
      console.log (response.status);
      // エラーレスポンスが返されたことを検知する
      if (!response.ok) {
        console.error('エラーレスポンス', response);
      } else {
        // JSONオブジェクトで解決されるPromiseを返す
        return response.json();
      }
    });
}

function createView (userInfo) {
  return escapeHTML`
    <h4>${userInfo.name} (@${userInfo.login})</h4>
    <img src="${userInfo.avatar_url} alt="${userInfo.login}" height="100">
    <dl>
      <dt>Location</dt>
      <dd>${userInfo.location}</dd>
      <dt>Repositories</dt>
      <dd>${userInfo.public_repos}</dd>
    </dl>
    `;
  }

function displayView (view) {
  const result = document.getElementById('result');
  result.innerHTML = view;
}

function escapeSpecialChars(str) {
  return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
  return strings.reduce((result, str, i) => {
      const value = values[i - 1];
      if (typeof value === "string") {
          return result + escapeSpecialChars(value) + str;
      } else {
          return result + String(value) + str;
      }
  });
}

console.log('index.js: loaded');
