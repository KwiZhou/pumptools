<template>
	<view>
	
			<view style="height: 95vh; width: 100vw;">
				<canvas type="webgl" id="c" @touchstart="touchStart" @touchmove="touchMove" @touchEnd="touchEnd"
					@touchCancel="touchCancel" @longTap="longTap" @tap="tap"></canvas>
			</view>
	</view>
</template>
<script>
	import getDDSLoader from '../../jsm/loaders/DDSLoader.js';
	import getMTLLoader from '../../jsm/loaders/MTLLoader.js';
	import getOBJLoader from '../../jsm/loaders/OBJLoader.js';
	import {
		OrbitControls
	} from '../../jsm/controls/OrbitControls';
	import * as THREE from '../../jsm/three.weapp.js'
	import loadObj from './loadObj'

	export default {

		onLoad() {
			this._Height = getApp().globalData.noTarBarHright
			wx.createSelectorQuery()
				.select('#c')
				.node(res => {

				})
				.exec((res) => {
					const canvas = new THREE.global.registerCanvas(res[0].node)
					loadObj(canvas, THREE)
				})
		},
		onUnload: function() {
			THREE.global.clearCanvas()
		},

		data() {
			return {
				_Height: undefined,
			}
		},
		methods: {
			touchStart(e) {
			//	console.log('canvas', e)
				THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
			},
			touchMove(e) {
			//	console.log('canvas', e)
				THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
			},
			touchEnd(e) {
			//	console.log('canvas', e)
				THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
			},
			touchCancel(e) {
				// console.log('canvas', e)
			},
			longTap(e) {
				// console.log('canvas', e)
			},
			tap(e) {
				// console.log('canvas', e)
			},

		}
	}
</script>

<style>
	#c {
		width: 100%;
		height: 100vh;
	}
</style>
