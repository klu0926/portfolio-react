// quill
import 'react-quill/dist/quill.snow.css' // import styles
//import 'react-quill/dist/quill.bubble.css' // import styles

import Quill from 'quill'

// blots
import { CustomImageBlot } from './CustomImageBlot'
import { VideoBlot } from './VideoBlot'

// Quill
Quill.register(CustomImageBlot)
Quill.register(VideoBlot)


export default Quill
