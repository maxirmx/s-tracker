// Copyright (C) 2023 Maxim [maxirmx] Samsonov  (www.sw.consulting)
// All rights reserved.
// This file is a part of s-tracker applcation
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

import { defineStore } from 'pinia'
import { fetchWrapper } from '@/helpers/fetch.wrapper.js'
import { apiUrl } from '@/helpers/config.js'

const baseUrl = `${apiUrl}/shipments`

export const useShipmentsStore = defineStore({
  id: 'shipments',
  state: () => ({
    shipments: {},
    shipment: {}
  }),
  actions: {
    async add(shipment) {
      await fetchWrapper.post(`${baseUrl}/add`, shipment)
    },
    async getAll(archieve = false) {
      this.shipments = { loading: true }
      try {
        const url = baseUrl + (archieve ? '/archieve' : '')
        this.shipments = await fetchWrapper.get(url)
      } catch (error) {
        this.shipments = { error }
      }
    },
    async get(id) {
      this.shipment = { loading: true }
      try {
        this.shipment = await fetchWrapper.get(`${baseUrl}/${id}`)
      } catch (error) {
        this.shipment = { error }
      }
    },
    async delete(id) {
      try {
        await fetchWrapper.delete(`${baseUrl}/${id}`, {})
      } catch (error) {
        this.shipment = { error }
      }
    },
    async update(id, params) {
      await fetchWrapper.put(`${baseUrl}/${id}`, params)
    }
  }
})
