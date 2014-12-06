import _ from 'lodash';
import Base from './base.js';

export default _.extend({}, Base, {
  type: 'match_fragment',

  render() {
    this._content.container = this.container.group();
    this._content.render();
  },

  position() {
    var box, paths = [];

    this._content.position();

    if (this._repeat.textValue !== '') {
      this._content.container.transform(this._repeat.content_position());

      box = this._content.container.getBBox();

      if (this._repeat.has_skip()) {
        paths.push(Snap.format('M0,{cy}q10,0 10,-10v-{vert}q0,-10 10,-10h{horiz}q10,0 10,10v{vert}q0,10 10,10', _.extend({
          vert: box.height / 2 - 10,
          horiz: box.width - 10
        }, box)));
      }

      if (this._repeat.has_loop()) {
        paths.push(Snap.format('M{x},{cy}q-10,0 -10,10v{vert}q0,10 10,10h{width}q10,0 10,-10v-{vert}q0,-10 -10,-10', _.extend({
          vert: box.height / 2 - 10
        }, box)));
      }

      if (this._repeat.has_loop() || this._repeat.has_skip()) {
        paths.push(Snap.format('M0,{cy}h15M{x2},{cy}h15', box));
      }

      if (paths.length) {
        this.container.path(paths.join(''));
      }
    } else {
      this._content.container.transform(Snap.matrix()
        .translate(0, 0));
    }

    this.render_bbox(this.container, this.container.getBBox());
  }
});
