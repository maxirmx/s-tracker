<script setup>
// Copyright (C) 2023 Maxim [maxirmx] Samsonov (www.sw.consulting)
// All rights reserved.
// This file is a part of s-tracker applcation
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
// 1. Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
// 2. Redistributions in binary form must reproduce the above copyright
// notice, this list of conditions and the following disclaimer in the
// documentation and/or other materials provided with the distribution.
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

import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'
import moment from 'moment'

import router from '@/router'

import { stcodes } from '@/helpers/statuses.js'
import { statuses } from '@/helpers/statuses.js'

const schema = Yup.object().shape({
  shipmentNumber: Yup.string().required('Укажите номер отправления'),
  status: Yup.string().required('Выберите статус'),
  dest: Yup.string().required('Укажите пункт назначения'),
  location: Yup.string().required('Укажите местонахождение'),
  date: Yup.string().required('Укажите дату'),
  ddate: Yup.string().required('Укажите ожидаемую дату прибытия')
})

function onSubmit(values /*, { setErrors } */) {
  console.log('Такое будет отправление: ' + JSON.stringify(values))
  router.go(-1)
}

const status = {
  shipmentNumber: '',
  status: stcodes.REGISTERED,
  location: '',
  date: moment().format('YYYY-MM-DD'),
  ddate: '',
  dest: '',
  comment: ''
}
</script>

<template>
  <div class="settings">
    <h1 class="orange">Новое отправление</h1>
    <hr class="hr" />
    <div class="settings">
      <Form
        @submit="onSubmit"
        :initial-values="status"
        :validation-schema="schema"
        v-slot="{ errors, isSubmitting }"
      >
        <div class="form-group">
          <label for="shipmentNumber" class="label">Номер отправления:</label>
          <Field
            name="shipmentNumber"
            type="text"
            class="form-control input"
            :class="{ 'is-invalid': errors.тгьиук }"
            placeholder="Номер отправления"
          />
        </div>
        <div class="form-group">
          <label for="status" class="label">Статус:</label>
          <Field
            name="status"
            as="select"
            class="form-control input select"
            :class="{ 'is-invalid': errors.status }"
          >
            <option value="">Выберите статус</option>
            <option v-for="status in statuses.items" :key="status" :value="status.id">
              {{ status.name }}
            </option>
          </Field>
        </div>
        <div class="form-group">
          <label for="location" class="label">Местонахождение:</label>
          <Field
            name="location"
            type="text"
            class="form-control input"
            :class="{ 'is-invalid': errors.location }"
            placeholder="Город, Страна"
          />
        </div>

        <div class="form-group">
          <label for="date" class="label">Дата:</label>
          <Field
            name="date"
            type="date"
            class="form-control input"
            :class="{ 'is-invalid': errors.date }"
          />
        </div>

        <div class="form-group">
          <label for="comment" class="label">Комментарий:</label>
          <Field
            name="comment"
            type="text"
            class="form-control input"
            :class="{ 'is-invalid': errors.comment }"
          />
        </div>

        <div class="form-group">
          <label for="dest" class="label">Пункт назначения:</label>
          <Field
            name="dest"
            type="text"
            class="form-control input"
            :class="{ 'is-invalid': errors.dest }"
            placeholder="Город, Страна"
          />
        </div>

        <div class="form-group">
          <label for="ddate" class="label">Ожидаемая дата прибытия:</label>
          <Field
            name="ddate"
            type="date"
            class="form-control input"
            :class="{ 'is-invalid': errors.ddate }"
          />
        </div>

        <div class="form-group">
          <button class="button" type="submit" :disabled="isSubmitting">
            <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
            Сохранить
          </button>
          <button class="button" @click="$router.go(-1)" :disabled="isSubmitting">
            <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
            Отменить
          </button>
        </div>
        <div v-if="errors.shipmentNumber" class="alert alert-danger mt-3 mb-0">
          {{ errors.shipmentNumber }}
        </div>
        <div v-if="errors.status" class="alert alert-danger mt-3 mb-0">{{ errors.status }}</div>
        <div v-if="errors.location" class="alert alert-danger mt-3 mb-0">{{ errors.location }}</div>
        <div v-if="errors.date" class="alert alert-danger mt-3 mb-0">{{ errors.date }}</div>
        <div v-if="errors.dest" class="alert alert-danger mt-3 mb-0">{{ errors.dest }}</div>
        <div v-if="errors.ddate" class="alert alert-danger mt-3 mb-0">{{ errors.ddate }}</div>
        <div v-if="errors.comment" class="alert alert-danger mt-3 mb-0">{{ errors.comment }}</div>
      </Form>
    </div>
  </div>
</template>

<style>
h1 {
  font-weight: 500;
  font-size: 2.2rem;
  position: relative;
  top: -10px;
}

@media (min-width: 768px) {
  h1 {
    font-size: 2.6rem;
  }
}
</style>