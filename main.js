// Checking page title
if (document.title.indexOf("MoriDim") !== -1) {
  console.log('In Moridim!');

  Object.forEach = function (obj, callback) {
    for (let key in obj)
      if (obj.hasOwnProperty(key))
        callback(obj[key], key);
  };

  class MoridimDownloader {
    constructor() {
      let seasons = document.querySelectorAll("ul.season");
      console.log('seasons', seasons);

      this.series = seasons.length !== 0;
      if (this.series) {
        // Add an element
        let container = document.getElementById("downloadsReleases");
        this.dom = document.createElement("div");
        container.insertBefore(this.dom, container.firstChild);

        // Add season changed event listeners
        seasons.forEach(season =>
          season.addEventListener("click", () => this.activeChanged()));
        this.activeChanged();
      }
    }

    activeChanged() {
      let activeEpisodes = document.querySelectorAll(".episodes.active .releases");
      if (activeEpisodes.length === 0)
        return;

      let qualities = {};
      activeEpisodes.forEach(episode => {
        episode.querySelectorAll("li b").forEach((release) => {
          if (qualities[release.innerText] === undefined)
            qualities[release.innerText] = 0;
          qualities[release.innerText]++
        });
      });

      console.log(qualities);

      let seasonQualities = [];
      Object.forEach(qualities, (amount, quality) => {
        if (amount === activeEpisodes.length)
          seasonQualities.push(quality);
      });

      // Create select with options
      this.select = document.createElement("select");
      seasonQualities.forEach(quality => {
        let option = document.createElement('option');
        option.value = quality;
        option.innerHTML = quality;
        this.select.appendChild(option);
      });

      let button = document.createElement("button");
      button.appendChild(document.createTextNode("Download"));
      button.onclick = () => this.download();

      this.dom.innerHTML = "";
      this.dom.appendChild(this.select);
      this.dom.appendChild(button);
    }

    download() {
      let quality = this.select.value;
      let activeEpisodes = document.querySelectorAll(".episodes.active  .releases");
      activeEpisodes.forEach(episode => {
        episode.querySelectorAll("li").forEach(release => {
          release.querySelectorAll("b").forEach(tag => {
            if (tag.innerText === quality)
              window.open(release.querySelector("a.downloadBtn").href, '_blank');
          });
        });
      });
    }
  }

  new MoridimDownloader();
} else if (document.title.indexOf("NitroBit") !== -1) {
  setInterval(() => {
    let a = document.getElementById("download");
    if (a) {
      window.open(a.href, "_blank");
      window.close();
    }
  }, 10);
}