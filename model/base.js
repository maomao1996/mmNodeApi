/**
 * 基础类
 */

// 歌曲信息
class BaseSong {
  constructor({ name, singer }) {
    this.name = name // 歌曲名
    this.singer = singer // 歌手名
  }
}

// 创建者信息
class Creator {
  constructor({ uid, name, picUrl }) {
    this.uid = uid // uid
    this.name = name // 名称
    this.picUrl = picUrl // 头像
  }
}

// 专辑信息
class Album {
  constructor({ id, mid, name, picUrl }) {
    this.id = id // 专辑id
    this.mid = mid // 专辑id
    this.name = name // 专辑名
    this.picUrl = picUrl // 专辑封面
  }
}

// 歌手信息
class BaseSinger {
  constructor({ id, mid, name }) {
    this.id = id // 歌手id
    this.mid = mid // 歌手id
    this.name = name // 歌手名
  }
}

module.exports = {
  BaseSong,
  Creator,
  Album,
  BaseSinger
}
