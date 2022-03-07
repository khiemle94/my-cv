var tempListLoadingText = [], loopTypeText = 3;

async function waitASeconds(second) {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000 * second);
  });
}

function getLoadingText() {
  let listLoadingTextDom = document.querySelectorAll(".loading-text");
  let loadingTextLength = listLoadingTextDom.length;
  for (let i = 0; i < loadingTextLength; i++) {
    // hidden border-bottom section
    document
      .querySelectorAll(".loading-text")
      [i].closest("section").style.border = "none";
    // set height
    document.querySelectorAll(".loading-text")[i].style.height =
      document.querySelectorAll(".loading-text")[i].offsetHeight + "px";
    // hide background
    document.querySelectorAll(".loading-text")[i].style.background = "none";
    // get text
    tempListLoadingText.push(listLoadingTextDom[i].innerText);
    // hide text
    document.querySelectorAll(".loading-text")[
      i
    ].innerHTML = listLoadingTextDom[i].innerText.replace(/(?!\s)./g, "&nbsp;");
    // hidden element
    document.querySelectorAll(".loading-text")[i].style.visibility = "hidden";
  }
}

async function loadingTextAnimate() {
  let listLoadingTextDom = document.querySelectorAll(".loading-text");
  let loadingTextLength = listLoadingTextDom.length;

  if (loadingTextLength) {
    // show element
    document.querySelectorAll(".loading-text")[0].style.visibility = null;
    for (let i = 0; i < loopTypeText; i++) {
      listLoadingTextDom[0].innerText = "|";
      await waitASeconds(1);
      listLoadingTextDom[0].innerHTML = "&nbsp;";
      await waitASeconds(1);
    }
  }

  for (let i = 0; i < loadingTextLength; i++) {
    // loop wait type text
    let tempText = "";
    // show element
    document.querySelectorAll(".loading-text")[i].style.visibility = null;
    // add border-bottom
    if (
      document.querySelectorAll(".loading-text")[i].closest("section")
        .previousElementSibling
    ) {
      document
        .querySelectorAll(".loading-text")
        [i].closest("section").previousElementSibling.style.border = null;
    }
    // load backgroud
    document.querySelectorAll(".loading-text")[i].style.background = null;
    for (let y = 0; y < tempListLoadingText[i].length; y++) {
      if (
        tempListLoadingText[i][y] === "." &&
        tempListLoadingText[i][y + 1] === " "
      ) {
        await waitASeconds(0.5);
      } else if (
        tempListLoadingText[i][y] === "," &&
        tempListLoadingText[i][y + 1] === " "
      ) {
        await waitASeconds(0.2);
      } else if (tempListLoadingText[i][y] === " ") {
        await waitASeconds(0.1);
      } else {
        await waitASeconds(0.05);
      }

      if (i === 0) {
        listLoadingTextDom[i].innerText += tempListLoadingText[i][y];
      } else {
        tempText += tempListLoadingText[i][y];
        listLoadingTextDom[i].innerText = tempText;
      }
    }
  }
}

async function hiddenLoader(second) {
  await waitASeconds(second);
  document.querySelector("#loader").style.display = "none";
}
