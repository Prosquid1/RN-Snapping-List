# RN-Snapping-List
Demoing two position-aware Carousel+Scrollview in React Native

This is a pure React Native implementation of this [multi-scrollview-interaction](https://user-images.githubusercontent.com/13585693/94900111-5735ac80-048c-11eb-81e4-3ec7535679ff.gif)

![App Demo Gif](https://user-images.githubusercontent.com/13585693/94900068-45eca000-048c-11eb-903d-9fcc30927f1a.gif)


*Note*:
The incremental drag in [setContentOffset](https://reactnative.dev/docs/scrollview#contentoffset) is only available on iOS, hence a different implementation was implemented for Android.
Slightly less impressive performance compared to iOS

Here is a [link](https://github.com/facebook/react-native/issues/6849) to keep updated on this issue.

#### Dependencies:
Install dependencies with the command below
```script
npm install && cd ios && pod install
```

#### Tests:
Run tests with the command below
```script
npm run tests
```


## License

    Copyright 2020, Oyeleke Okiki

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
