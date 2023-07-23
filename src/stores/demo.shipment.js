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

export const shipment = {
  history: [
    {
      id: 1115,
      status: stcodes.DELIVERED,
      date: '21.07.2023',
      location: 'Опочка, РФ',
      shipmentId: '1234A1'
    },
    {
      id: 1114,
      status: stcodes.OUT_OF_STORAGE,
      date: '21.07.2023',
      location: 'Псков, РФ',
      shipmentId: '1234A1'
    },
    {
      id: 1112,
      status: stcodes.IN_STORAGE,
      date: '20.07.2023',
      location: 'Псков, РФ',
      shipmentId: '1234A1'
    },
    {
      id: 1111,
      status: stcodes.OUT_OF_STORAGE,
      date: '19.07.2023',
      location: 'Новороссийск, РФ',
      shipmentId: '1234A1'
    },
    {
      id: 904,
      status: stcodes.CUSTOMS_END,
      date: '19.07.2023',
      location: 'Новороссийск, РФ',
      shipmentId: '1234A1'
    },
    {
      id: 805,
      status: stcodes.CUSTOMS_START,
      date: '16.07.2023',
      location: 'Новороссийск, РФ',
      shipmentId: '1234A1'
    },
    {
      id: 706,
      status: stcodes.IN_STORAGE,
      date: '16.07.2023',
      location: 'Новороссийск, РФ',
      shipmentId: '1234A1'
    },
    {
      id: 607,
      status: stcodes.OUT_OF_STORAGE,
      date: '14.07.2023',
      location: 'Newark, US',
      shipmentId: '1234A1'
    },
    {
      id: 508,
      status: stcodes.CUSTOMS_END,
      date: '13.07.2023',
      location: 'Newark, US',
      shipmentId: '1234A1'
    },
    {
      id: 409,
      status: stcodes.CUSTOMS_START,
      date: '12.07.2023',
      location: 'Newark, US',
      shipmentId: '1234A1'
    },
    {
      id: 310,
      status: stcodes.IN_STORAGE,
      date: '10.07.2023',
      location: 'Newark, US',
      shipmentId: '1234A1'
    },
    {
      id: 211,
      status: stcodes.OUT_OF_STORAGE,
      date: '10.07.2023',
      location: 'Buffalo, US',
      shipmentId: '1234A1'
    },
    {
      id: 112,
      status: stcodes.IN_STORAGE,
      date: '02.07.2023',
      location: 'Buffalo, US',
      shipmentId: '1234A1'
    },
    {
      id: 14,
      status: stcodes.COLLECTED,
      date: '02.07.2023',
      location: 'Montreal, CA',
      shipmentId: '1234A1'
    },
    {
      id: 12,
      status: stcodes.REGISTERED,
      date: '01.07.2023',
      location: 'Montreal, CA',
      shipmentId: '1234A1'
    }
  ]
}
