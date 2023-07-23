// Copyright (C) 2023 Maxim [maxirmx] Samsonov  (www.sw.consulting)
// All rights reserved.
// This file is a part of s-tracker applcation  (test data set)
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
// 1. Redistributions of source code must retain the above copyright
//    notice, this list of conditions and the following disclaimer.
// 2. Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in the
//    documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
// TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
// PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR CONTRIBUTORS
// BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

import { stcodes } from '@/helpers/statuses.js'

export const shipments = {
  items: [
    {
      number: '1034A7',
      location: 'Kuala Lumpur, ML',
      statusCode: stcodes.COLLECTED,
      date: '12/07/2023'
    },
    {
      number: '2234A1',
      location: 'Тикси, РФ',
      statusCode: stcodes.REGISTERED,
      date: '14/07/2023'
    },
    {
      number: '2274A1',
      location: 'Струги Красные, РФ',
      statusCode: stcodes.IN_STORAGE,
      date: '15/07/2023'
    },
    {
      number: '2274A4',
      location: 'Лесосибирск, РФ',
      statusCode: stcodes.DELIVERED,
      date: '15/07/2023'
    },
    {
      number: '1234A1',
      location: 'Опочка, РФ',
      statusCode: stcodes.DELIVERED,
      date: '21/07/2023'
    }
  ]
}
