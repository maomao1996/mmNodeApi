/**
 * 歌词解析类模型
 */
const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g
// const tagRegMap = {
//     title: 'ti',
//     artist: 'ar',
//     album: 'al',
//     offset: 'offset',
//     by: 'by'
// };

module.exports = class Lyric {
  constructor(lrc) {
    this.lrc = lrc
    this.lyric = []
    this._init()
  }

  _init() {
    this._initLines()
  }

  _initLines() {
    const lines = this.lrc.split('\n')
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const result = timeExp.exec(line)
      if (result) {
        const text = line.replace(timeExp, '').trim()
        if (text) {
          const plus = n =>
            result[1] * 6e4 + result[2] * 1e3 + (result[3] || 0) * n
          if (this.type === 'qq') {
            this.lyric.push({
              time: plus(10),
              text
            })
          } else {
            this.lyric.push({
              time: plus(1),
              text
            })
          }
        }
      }
    }

    this.lyric.sort((a, b) => {
      return a.time - b.time
    })
  }
}
