// Copyright 2022 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { testDataAlt } from './mock-data';
import { TimeSeriesQueryPlugin } from '@perses-dev/plugin-system';
import { ImageQuerySpec } from './image-query-model';
import {} from './image-query-model';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const getTimeSeriesData: TimeSeriesQueryPlugin<ImageQuerySpec>['getTimeSeriesData'] = async (spec, context) => {
  if (spec.query === undefined || spec.query === null || spec.query === '') {
    // Do not make a request to the backend, instead return an empty TimeSeriesData
    return testDataAlt;
  }

  if (spec.query !== 'cartoon portrait of animals playing chess in the style of Susie Carmichael, award winning') {
    return;
  }

  const body = {
    prompt: spec.query,
    init_image: null,
  };

  const response = await fetch('/api/predictions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  let prediction = await response.json();
  if (response.status !== 201) {
    console.error(response);
    return;
  }

  while (prediction.status !== 'succeeded' && prediction.status !== 'failed') {
    await sleep(5000);
    const response = await fetch('/api/predictions/' + prediction.id);
    prediction = await response.json();
    if (response.status !== 200) {
      console.error(response);
      return;
    }
    if (prediction.status === 'succeeded') {
      return prediction;
    }
  }
};
