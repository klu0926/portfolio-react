import Quill from 'quill';

const Embed = Quill.import('blots/embed');

class CustomImageBlot extends Embed {
  static create(url) {
    const node = super.create();
    node.setAttribute('src', url);
    node.setAttribute('class', 'quill-image resize-drag');
    return node;
  }

  static formats(node) {
    let format = {};
    if (node.hasAttribute('height')) {
      format.height = node.getAttribute('height');
    }
    if (node.hasAttribute('width')) {
      format.width = node.getAttribute('width');
    }
    return format;
  }

  format(name, value) {
    if (name === 'height' || name === 'width') {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }

  static value(node) {
    return node.getAttribute('src');
  }
}

CustomImageBlot.blotName = 'customImage'; // Use when inserting the blot
CustomImageBlot.tagName = 'img'; // Tag name of the DOM node

// Example of registering the blot with Quill (adjust as needed)
Quill.register({
  'formats/image': CustomImageBlot,
}, true);

export { CustomImageBlot };
