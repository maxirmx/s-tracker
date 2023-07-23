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
    { id:0, status: stcodes.DELIVERED, date: '21/07/2023', location: 'Опочка, РФ' },
    { id:1, status: stcodes.OUT_OF_STORAGE, date: '21/07/2023', location: 'Псков, РФ' },
    { id:2, status: stcodes.IN_STORAGE, date: '20/07/2023', location: 'Псков, РФ' },
    { id:3, status: stcodes.OUT_OF_STORAGE, date: '19/07/2023', location: 'Новороссийск, РФ' },
    { id:4, status: stcodes.CUSTOMS_END, date: '19/07/2023', location: 'Новороссийск, РФ' },
    { id:5, status: stcodes.CUSTOMS_START, date: '16/07/2023', location: 'Новороссийск, РФ' },
    { id:6, status: stcodes.IN_STORAGE, date: '16/07/2023', location: 'Новороссийск, РФ' },
    { id:7, status: stcodes.OUT_OF_STORAGE, date: '14/07/2023', location: 'Newark, US' },
    { id:8, status: stcodes.CUSTOMS_END, date: '13/07/2023', location: 'Newark, US' },
    { id:9, status: stcodes.CUSTOMS_START, date: '12/07/2023', location: 'Newark, US' },
    { id:10, status: stcodes.IN_STORAGE, date: '10/07/2023', location: 'Newark, US' },
    { id:11, status: stcodes.OUT_OF_STORAGE, date: '10/07/2023', location: 'Buffalo, US' },
    { id:12, status: stcodes.IN_STORAGE, date: '2/07/2023', location: 'Buffalo, US' },
    { id:14, status: stcodes.COLLECTED, date: '2/07/2023', location: 'Montreal, CA' },
    { id:15, status: stcodes.REGISTERED, date: '1/07/2023', location: 'Montreal, CA' }
  ]
}
