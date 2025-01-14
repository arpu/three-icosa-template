/*!
 * three-icosa
 * https://github.com/icosa-gallery/three-icosa
 * Copyright (c) 2021-2022 Icosa Gallery
 * Released under the Apache 2.0 Licence.
 */
import { Vector4, Vector3, Loader, FileLoader, TextureLoader, RepeatWrapping, UniformsLib, RawShaderMaterial, Matrix4, Clock } from './three.module.js';

// Copyright 2021-2022 Icosa Gallery

class TiltShaderLoader extends Loader {
    constructor( manager ) {
        super( manager );
    }
    
    async load(brushName, onLoad, onProgress, onError ) {
        const scope = this;

        const isAlreadyLoaded = loadedMaterials[brushName];
        
        if (isAlreadyLoaded !== undefined) {
            onLoad( scope.parse( isAlreadyLoaded ) );
            return;
        }
        
		const loader = new FileLoader( this.manager );
		loader.setPath( this.path );
		loader.setResponseType( 'text' );
		loader.setWithCredentials( this.withCredentials );

        const textureLoader = new TextureLoader(this.manager);
        textureLoader.setPath(this.path);
        textureLoader.setWithCredentials( this.withCredentials );

        const materialParams = tiltBrushMaterialParams[brushName];

        materialParams.vertexShader = await loader.loadAsync(materialParams.vertexShader);
        materialParams.fragmentShader = await loader.loadAsync(materialParams.fragmentShader);

        if (materialParams.uniforms.u_MainTex) {
            const mainTex = await textureLoader.loadAsync(materialParams.uniforms.u_MainTex.value);
            mainTex.name = `${brushName}_MainTex`;
            mainTex.wrapS = RepeatWrapping;
            mainTex.wrapT = RepeatWrapping;
            mainTex.flipY = false;
            materialParams.uniforms.u_MainTex.value = mainTex;
        }

        if (materialParams.uniforms.u_BumpMap) {
            const bumpMap = await textureLoader.loadAsync(materialParams.uniforms.u_BumpMap.value);
            bumpMap.name = `${brushName}_BumpMap`;
            bumpMap.wrapS = RepeatWrapping;
            bumpMap.wrapT = RepeatWrapping;
            bumpMap.flipY = false;
            materialParams.uniforms.u_BumpMap.value = bumpMap;
        }

        if (materialParams.uniforms.u_AlphaMask) {
            const alphaMask = await textureLoader.loadAsync(materialParams.uniforms.u_AlphaMask.value);
            alphaMask.name = `${brushName}_AlphaMask`;
            alphaMask.wrapS = RepeatWrapping;
            alphaMask.wrapT = RepeatWrapping;
            alphaMask.flipY = false;
            materialParams.uniforms.u_AlphaMask.value = alphaMask;
        }

        // inject three.js lighting uniforms
        for(var lightType in UniformsLib.lights)
        {
            materialParams.uniforms[lightType] = UniformsLib.lights[lightType];
        }

        let rawMaterial = new RawShaderMaterial(materialParams);
        loadedMaterials[brushName] = rawMaterial;
        onLoad( scope.parse( rawMaterial ) );
    }

    parse( rawMaterial ) {
        return rawMaterial;
    }

    lookupMaterial(nameOrGuid) {
        switch(nameOrGuid) {
            case "BlocksBasic:":
            case "0e87b49c-6546-3a34-3a44-8a556d7d6c3e":
                return tiltBrushMaterialParams["BlocksBasic"];

            case "BlocksGem":
            case "232998f8-d357-47a2-993a-53415df9be10":
                return tiltBrushMaterialParams["BlocksGem"];

            case "BlocksGlass":
            case "3d813d82-5839-4450-8ddc-8e889ecd96c7":
                return tiltBrushMaterialParams["BlocksGlass"];

            case "Bubbles":
            case "89d104cd-d012-426b-b5b3-bbaee63ac43c":
                return tiltBrushMaterialParams["Bubbles"];

            case "CelVinyl":
            case "700f3aa8-9a7c-2384-8b8a-ea028905dd8c":
                return tiltBrushMaterialParams["CelVinyl"];

            case "ChromaticWave":
            case "0f0ff7b2-a677-45eb-a7d6-0cd7206f4816":
                return tiltBrushMaterialParams["ChromaticWave"];

            case "CoarseBristles":
            case "1161af82-50cf-47db-9706-0c3576d43c43":
            case "79168f10-6961-464a-8be1-57ed364c5600":
                return tiltBrushMaterialParams["CoarseBristles"];
                
            case "Comet":
            case "1caa6d7d-f015-3f54-3a4b-8b5354d39f81":
                return tiltBrushMaterialParams["Comet"];
            
            case "DiamondHull":
            case "c8313697-2563-47fc-832e-290f4c04b901":
                return tiltBrushMaterialParams["DiamondHull"];
            
            case "Disco":
            case "4391aaaa-df73-4396-9e33-31e4e4930b27":
                return tiltBrushMaterialParams["Disco"];
            
            case "DotMarker":
            case "d1d991f2-e7a0-4cf1-b328-f57e915e6260":
                return tiltBrushMaterialParams["DotMarker"];
            
            case "Dots":
            case "6a1cf9f9-032c-45ec-9b1d-a6680bee30f7":
                return tiltBrushMaterialParams["Dots"];

            case "DoubleTaperedFlat":
            case "0d3889f3-3ede-470c-8af4-f44813306126":
                return tiltBrushMaterialParams["DoubleTaperedFlat"];
            
            case "DoubleTaperedMarker":
            case "0d3889f3-3ede-470c-8af4-de4813306126":
                return tiltBrushMaterialParams["DoubleTaperedMarker"];
            
            case "DuctTape":
            case "d0262945-853c-4481-9cbd-88586bed93cb":
            case "3ca16e2f-bdcd-4da2-8631-dcef342f40f1":
                return tiltBrushMaterialParams["DuctTape"];
            
            case "Electricity":
            case "f6e85de3-6dcc-4e7f-87fd-cee8c3d25d51":
                return tiltBrushMaterialParams["Electricity"];

            case "Embers":
            case "02ffb866-7fb2-4d15-b761-1012cefb1360":
                return tiltBrushMaterialParams["Embers"];
            
            case "EnvironmentDiffuse":
            case "0ad58bbd-42bc-484e-ad9a-b61036ff4ce7": 
                return tiltBrushMaterialParams["EnvironmentDiffuse"];
            
            case "EnvironmentDiffuseLightMap":
            case "d01d9d6c-9a61-4aba-8146-5891fafb013b":
                return tiltBrushMaterialParams["EnvironmentDiffuseLightMap"];

            case "Fire":
            case "cb92b597-94ca-4255-b017-0e3f42f12f9e":
                return tiltBrushMaterialParams["Fire"];

            case "2d35bcf0-e4d8-452c-97b1-3311be063130":
            case "280c0a7a-aad8-416c-a7d2-df63d129ca70":
            case "55303bc4-c749-4a72-98d9-d23e68e76e18":
            case "Flat":
                return tiltBrushMaterialParams["Flat"];
            
            case "cf019139-d41c-4eb0-a1d0-5cf54b0a42f3":
            case "geometry_Highlighter":
                return tiltBrushMaterialParams["Highlighter"];
            
            case "Hypercolor":
            case "dce872c2-7b49-4684-b59b-c45387949c5c":
            case "e8ef32b1-baa8-460a-9c2c-9cf8506794f5":
                return tiltBrushMaterialParams["Hypercolor"];
            
            case "HyperGrid":
            case "6a1cf9f9-032c-45ec-9b6e-a6680bee32e9":
                return tiltBrushMaterialParams["HyperGrid"];

            case "Icing":
            case "2f212815-f4d3-c1a4-681a-feeaf9c6dc37":
                return tiltBrushMaterialParams["Icing"];
            
            case "Ink":
            case "f5c336cf-5108-4b40-ade9-c687504385ab":
            case "c0012095-3ffd-4040-8ee1-fc180d346eaa":
                return tiltBrushMaterialParams["Ink"];

            case "Leaves":
            case "4a76a27a-44d8-4bfe-9a8c-713749a499b0":
            case "ea19de07-d0c0-4484-9198-18489a3c1487":
                return tiltBrushMaterialParams["Leaves"];

            case "Light":
            case "2241cd32-8ba2-48a5-9ee7-2caef7e9ed62":
                return tiltBrushMaterialParams["Light"];

            case "LightWire":
            case "4391aaaa-df81-4396-9e33-31e4e4930b27":
                return tiltBrushMaterialParams["LightWire"];
            
            case "Lofted":
            case "d381e0f5-3def-4a0d-8853-31e9200bcbda":
                return tiltBrushMaterialParams["Lofted"];

            case "Marker":
            case "429ed64a-4e97-4466-84d3-145a861ef684":
                return tiltBrushMaterialParams["Marker"];
            
            case "MatteHull":
            case "79348357-432d-4746-8e29-0e25c112e3aa":
                return tiltBrushMaterialParams["MatteHull"];

            case "NeonPulse":
            case "b2ffef01-eaaa-4ab5-aa64-95a2c4f5dbc6":
                return tiltBrushMaterialParams["NeonPulse"];

            case "OilPaint":
            case "f72ec0e7-a844-4e38-82e3-140c44772699":
            case "c515dad7-4393-4681-81ad-162ef052241b":
                return tiltBrushMaterialParams["OilPaint"];

            case "Paper":
            case "f1114e2e-eb8d-4fde-915a-6e653b54e9f5":
            case "759f1ebd-20cd-4720-8d41-234e0da63716":
                return tiltBrushMaterialParams["Paper"];
            
            case "PbrTemplate":
            case "f86a096c-2f4f-4f9d-ae19-81b99f2944e0":
                return tiltBrushMaterialParams["PbrTemplate"];
            
            case "PbrTransparentTemplate":
            case "19826f62-42ac-4a9e-8b77-4231fbd0cfbf":
                return tiltBrushMaterialParams["PbrTransparentTemplate"];
            
            case "Petal":
            case "e0abbc80-0f80-e854-4970-8924a0863dcc":
                return tiltBrushMaterialParams["Petal"];

            case "Plasma":
            case "c33714d1-b2f9-412e-bd50-1884c9d46336":
                return tiltBrushMaterialParams["Plasma"];
            
            case "Rainbow":
            case "ad1ad437-76e2-450d-a23a-e17f8310b960":
                return tiltBrushMaterialParams["Rainbow"];

            case "ShinyHull":
            case "faaa4d44-fcfb-4177-96be-753ac0421ba3":
                return tiltBrushMaterialParams["ShinyHull"];

            case "Smoke":
            case "70d79cca-b159-4f35-990c-f02193947fe8":
                return tiltBrushMaterialParams["Smoke"];
            
            case "Snow":
            case "d902ed8b-d0d1-476c-a8de-878a79e3a34c":
                return tiltBrushMaterialParams["Snow"];

            case "SoftHighlighter":
            case "accb32f5-4509-454f-93f8-1df3fd31df1b":
                return tiltBrushMaterialParams["SoftHighlighter"];
            
            case "Spikes":
            case "cf7f0059-7aeb-53a4-2b67-c83d863a9ffa":
                return tiltBrushMaterialParams["Spikes"];
            
            case "Splatter":
            case "8dc4a70c-d558-4efd-a5ed-d4e860f40dc3":
            case "7a1c8107-50c5-4b70-9a39-421576d6617e":
                return tiltBrushMaterialParams["Splatter"];
            
            case "Stars":
            case "0eb4db27-3f82-408d-b5a1-19ebd7d5b711":
                return tiltBrushMaterialParams["Stars"];

            case "Streamers":
            case "44bb800a-fbc3-4592-8426-94ecb05ddec3":
                return tiltBrushMaterialParams["Streamers"];
            
            case "Taffy":
            case "0077f88c-d93a-42f3-b59b-b31c50cdb414":
                return tiltBrushMaterialParams["Taffy"];

            case "TaperedFlat":
            case "b468c1fb-f254-41ed-8ec9-57030bc5660c":
            case "c8ccb53d-ae13-45ef-8afb-b730d81394eb":
                return tiltBrushMaterialParams["TaperedFlat"];

            case "TaperedMarker":
            case "d90c6ad8-af0f-4b54-b422-e0f92abe1b3c":
            case "1a26b8c0-8a07-4f8a-9fac-d2ef36e0cad0":
                return tiltBrushMaterialParams["TaperedMarker"];

            case "ThickPaint":
            case "75b32cf0-fdd6-4d89-a64b-e2a00b247b0f":
            case "fdf0326a-c0d1-4fed-b101-9db0ff6d071f":
                return tiltBrushMaterialParams["ThickPaint"];
            
            case "Toon":
            case "4391385a-df73-4396-9e33-31e4e4930b27":
                return tiltBrushMaterialParams["Toon"];

            case "UnlitHull":
            case "a8fea537-da7c-4d4b-817f-24f074725d6d":
                return tiltBrushMaterialParams["UnlitHull"];
            
            case "VelvetInk":
            case "d229d335-c334-495a-a801-660ac8a87360":
                return tiltBrushMaterialParams["VelvetInk"];

            case "Waveform":
            case "10201aa3-ebc2-42d8-84b7-2e63f6eeb8ab":
                return tiltBrushMaterialParams["Waveform"];

            case "WetPaint":
            case "b67c0e81-ce6d-40a8-aeb0-ef036b081aa3":
            case "dea67637-cd1a-27e4-c9b1-52f4bbcb84e5":
                return tiltBrushMaterialParams["WetPaint"];

            case "WigglyGraphite":
            case "5347acf0-a8e2-47b6-8346-30c70719d763":
            case "e814fef1-97fd-7194-4a2f-50c2bb918be2":
                return tiltBrushMaterialParams["WigglyGraphite"];

            case "wire":
            case "4391385a-cf83-4396-9e33-31e4e4930b27":
                return tiltBrushMaterialParams["Wire"];
        }    }
}

const loadedMaterials = {};

const tiltBrushMaterialParams = {
    "BlocksBasic" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_Shininess: { value: 0.2 },
            u_SpecColor: { value: new Vector3(0.1960784, 0.1960784, 0.1960784) },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 }
        },
        vertexShader: "BlocksBasic-0e87b49c-6546-3a34-3a44-8a556d7d6c3e/BlocksBasic-0e87b49c-6546-3a34-3a44-8a556d7d6c3e-v10.0-vertex.glsl",
        fragmentShader: "BlocksBasic-0e87b49c-6546-3a34-3a44-8a556d7d6c3e/BlocksBasic-0e87b49c-6546-3a34-3a44-8a556d7d6c3e-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "BlocksGem" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: {value: new Vector4(0.3922, 0.3922, 0.3922, 1)},
            u_SceneLight_0_color: {value: new Vector4(0.7780, 0.8157, 0.9914, 1)},
            u_SceneLight_1_color: {value: new Vector4(0.4282, 0.4212, 0.3459, 1)},
            u_Color: { value: new Vector4(1, 1, 1, 1) },
            u_Shininess: { value: 0.9 },
            u_RimIntensity: { value: 0.5 },
            u_RimPower: { value: 2 },
            u_Frequency: { value: 2 },
            u_Jitter: { value: 1 },
            u_fogColor: {value: new Vector3(0.0196, 0.0196, 0.0196)},
            u_fogDensity: {value: 0 }
        },
        vertexShader: "BlocksGem-232998f8-d357-47a2-993a-53415df9be10/BlocksGem-232998f8-d357-47a2-993a-53415df9be10-v10.0-vertex.glsl",
        fragmentShader: "BlocksGem-232998f8-d357-47a2-993a-53415df9be10/BlocksGem-232998f8-d357-47a2-993a-53415df9be10-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "BlocksGlass" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_Color: { value: new Vector4(1, 1, 1, 1) },
            u_Shininess: { value: 0.8 },
            u_RimIntensity: { value: 0.7 },
            u_RimPower: { value: 4 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 }
        },
        vertexShader: "BlocksGlass-3d813d82-5839-4450-8ddc-8e889ecd96c7/BlocksGlass-3d813d82-5839-4450-8ddc-8e889ecd96c7-v10.0-vertex.glsl",
        fragmentShader: "BlocksGlass-3d813d82-5839-4450-8ddc-8e889ecd96c7/BlocksGlass-3d813d82-5839-4450-8ddc-8e889ecd96c7-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2
    },
    "Bubbles" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_MainTex: { value: "Bubbles-89d104cd-d012-426b-b5b3-bbaee63ac43c/Bubbles-89d104cd-d012-426b-b5b3-bbaee63ac43c-v10.0-MainTex.png" },
        },
        vertexShader: "Bubbles-89d104cd-d012-426b-b5b3-bbaee63ac43c/Bubbles-89d104cd-d012-426b-b5b3-bbaee63ac43c-v10.0-vertex.glsl",
        fragmentShader: "Bubbles-89d104cd-d012-426b-b5b3-bbaee63ac43c/Bubbles-89d104cd-d012-426b-b5b3-bbaee63ac43c-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2
    },
    "CelVinyl" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_Cutoff: { value: 0.554 },
            u_MainTex: { value: "CelVinyl-700f3aa8-9a7c-2384-8b8a-ea028905dd8c/CelVinyl-700f3aa8-9a7c-2384-8b8a-ea028905dd8c-v10.0-MainTex.png" },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
        },
        vertexShader: "CelVinyl-700f3aa8-9a7c-2384-8b8a-ea028905dd8c/CelVinyl-700f3aa8-9a7c-2384-8b8a-ea028905dd8c-v10.0-vertex.glsl",
        fragmentShader: "CelVinyl-700f3aa8-9a7c-2384-8b8a-ea028905dd8c/CelVinyl-700f3aa8-9a7c-2384-8b8a-ea028905dd8c-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "ChromaticWave" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_time: { value: new Vector4() },
            u_EmissionGain: { value: 0.45 },
        },
        vertexShader: "ChromaticWave-0f0ff7b2-a677-45eb-a7d6-0cd7206f4816/ChromaticWave-0f0ff7b2-a677-45eb-a7d6-0cd7206f4816-v10.0-vertex.glsl",
        fragmentShader: "ChromaticWave-0f0ff7b2-a677-45eb-a7d6-0cd7206f4816/ChromaticWave-0f0ff7b2-a677-45eb-a7d6-0cd7206f4816-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 5,
        blendDstAlpha: 201,
        blendDst: 201,
        blendEquationAlpha: 100,
        blendEquation: 100,
        blendSrcAlpha: 201,
        blendSrc: 201
    },
    "CoarseBristles" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_MainTex: { value: "CoarseBristles-1161af82-50cf-47db-9706-0c3576d43c43/CoarseBristles-1161af82-50cf-47db-9706-0c3576d43c43-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.25 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
        },
        vertexShader: "CoarseBristles-1161af82-50cf-47db-9706-0c3576d43c43/CoarseBristles-1161af82-50cf-47db-9706-0c3576d43c43-v10.0-vertex.glsl",
        fragmentShader: "CoarseBristles-1161af82-50cf-47db-9706-0c3576d43c43/CoarseBristles-1161af82-50cf-47db-9706-0c3576d43c43-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "Comet" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_MainTex: { value: "Comet-1caa6d7d-f015-3f54-3a4b-8b5354d39f81/Comet-1caa6d7d-f015-3f54-3a4b-8b5354d39f81-v10.0-MainTex.png" },
            u_AlphaMask: { value: "Comet-1caa6d7d-f015-3f54-3a4b-8b5354d39f81/Comet-1caa6d7d-f015-3f54-3a4b-8b5354d39f81-v10.0-AlphaMask.png" },
            u_AlphaMask_TexelSize: { value: new Vector4(0.0156, 1, 64, 1)},
            u_time: { value: new Vector4() },
            u_Speed: { value: 1 },
            u_EmissionGain: { value: 0.5 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
        },
        vertexShader: "Comet-1caa6d7d-f015-3f54-3a4b-8b5354d39f81/Comet-1caa6d7d-f015-3f54-3a4b-8b5354d39f81-v10.0-vertex.glsl",
        fragmentShader: "Comet-1caa6d7d-f015-3f54-3a4b-8b5354d39f81/Comet-1caa6d7d-f015-3f54-3a4b-8b5354d39f81-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2
    },
    "DiamondHull" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_MainTex: { value: "DiamondHull-c8313697-2563-47fc-832e-290f4c04b901/DiamondHull-c8313697-2563-47fc-832e-290f4c04b901-v10.0-MainTex.png" },
            u_time: { value: new Vector4() },
            cameraPosition: { value: new Vector3() },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
        },
        vertexShader: "DiamondHull-c8313697-2563-47fc-832e-290f4c04b901/DiamondHull-c8313697-2563-47fc-832e-290f4c04b901-v10.0-vertex.glsl",
        fragmentShader: "DiamondHull-c8313697-2563-47fc-832e-290f4c04b901/DiamondHull-c8313697-2563-47fc-832e-290f4c04b901-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 5,
        blendDstAlpha: 201,
        blendDst: 201,
        blendEquationAlpha: 100,
        blendEquation: 100,
        blendSrcAlpha: 201,
        blendSrc: 201,
    },
    "Disco" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_time: { value: new Vector4() },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_Shininess: { value: 0.65 },
            u_SpecColor: { value: new Vector3(0.5147059, 0.5147059, 0.5147059) },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 }
        },
        vertexShader: "Disco-4391aaaa-df73-4396-9e33-31e4e4930b27/Disco-4391aaaa-df73-4396-9e33-31e4e4930b27-v10.0-vertex.glsl",
        fragmentShader: "Disco-4391aaaa-df73-4396-9e33-31e4e4930b27/Disco-4391aaaa-df73-4396-9e33-31e4e4930b27-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "DotMarker" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_MainTex: { value: "DotMarker-d1d991f2-e7a0-4cf1-b328-f57e915e6260/DotMarker-d1d991f2-e7a0-4cf1-b328-f57e915e6260-v10.0-MainTex.png" },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 }
        },
        vertexShader: "DotMarker-d1d991f2-e7a0-4cf1-b328-f57e915e6260/DotMarker-d1d991f2-e7a0-4cf1-b328-f57e915e6260-v10.0-vertex.glsl",
        fragmentShader: "DotMarker-d1d991f2-e7a0-4cf1-b328-f57e915e6260/DotMarker-d1d991f2-e7a0-4cf1-b328-f57e915e6260-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        
    },
    "Dots" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_MainTex: { value: "Dots-6a1cf9f9-032c-45ec-9b1d-a6680bee30f7/Dots-6a1cf9f9-032c-45ec-9b1d-a6680bee30f7-v10.0-MainTex.png" },
            u_TintColor: { value: new Vector4(1, 1, 1, 1) },
            u_EmissionGain: { value: 300 },
            u_BaseGain: { value: 0.4 }
        },
        vertexShader: "Dots-6a1cf9f9-032c-45ec-9b1d-a6680bee30f7/Dots-6a1cf9f9-032c-45ec-9b1d-a6680bee30f7-v10.0-vertex.glsl",
        fragmentShader: "Dots-6a1cf9f9-032c-45ec-9b1d-a6680bee30f7/Dots-6a1cf9f9-032c-45ec-9b1d-a6680bee30f7-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2
    },
    "DoubleTaperedFlat" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_Shininess: { value: 0.1500 },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
        },
        vertexShader: "DoubleTaperedFlat-0d3889f3-3ede-470c-8af4-f44813306126/DoubleTaperedFlat-0d3889f3-3ede-470c-8af4-f44813306126-v10.0-vertex.glsl",
        fragmentShader: "DoubleTaperedFlat-0d3889f3-3ede-470c-8af4-f44813306126/DoubleTaperedFlat-0d3889f3-3ede-470c-8af4-f44813306126-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "DoubleTaperedMarker" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
        },
        vertexShader: "DoubleTaperedMarker-0d3889f3-3ede-470c-8af4-de4813306126/DoubleTaperedMarker-0d3889f3-3ede-470c-8af4-de4813306126-v10.0-vertex.glsl",
        fragmentShader: "DoubleTaperedMarker-0d3889f3-3ede-470c-8af4-de4813306126/DoubleTaperedMarker-0d3889f3-3ede-470c-8af4-de4813306126-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "DuctTape" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0.5372549, 0.5372549, 0.5372549) },
            u_Shininess: { value: 0.414 },
            u_MainTex: { value: "DuctTape-3ca16e2f-bdcd-4da2-8631-dcef342f40f1/DuctTape-3ca16e2f-bdcd-4da2-8631-dcef342f40f1-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_BumpMap: { value: "DuctTape-3ca16e2f-bdcd-4da2-8631-dcef342f40f1/DuctTape-3ca16e2f-bdcd-4da2-8631-dcef342f40f1-v10.0-BumpMap.png" },
            u_BumpMap_TexelSize: { value: new Vector4(0.0010, 0.0078, 1024, 128) },
        },
        vertexShader: "DuctTape-d0262945-853c-4481-9cbd-88586bed93cb/DuctTape-d0262945-853c-4481-9cbd-88586bed93cb-v10.0-vertex.glsl",
        fragmentShader: "DuctTape-d0262945-853c-4481-9cbd-88586bed93cb/DuctTape-d0262945-853c-4481-9cbd-88586bed93cb-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "Electricity" : {
        uniforms: {
            u_time: { value: new Vector4() },
            u_DisplacementIntensity: { value: 2.0 },
            u_EmissionGain: { value: 0.2 }
        },
        vertexShader: "Electricity-f6e85de3-6dcc-4e7f-87fd-cee8c3d25d51/Electricity-f6e85de3-6dcc-4e7f-87fd-cee8c3d25d51-v10.0-vertex.glsl",
        fragmentShader: "Electricity-f6e85de3-6dcc-4e7f-87fd-cee8c3d25d51/Electricity-f6e85de3-6dcc-4e7f-87fd-cee8c3d25d51-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2
    },
    "Embers" : {
        uniforms: {
            u_time: { value: new Vector4() },
            u_ScrollRate: { value: 0.6 },
            u_ScrollDistance: { value: new Vector3(-0.2, 0.6, 0) },
            u_ScrollJitterIntensity: { value: 0.03 },
            u_ScrollJitterFrequency: { value: 5 },
            u_TintColor: { value: new Vector4(1, 1, 1, 1) },
            u_MainTex: { value: "Embers-02ffb866-7fb2-4d15-b761-1012cefb1360/Embers-02ffb866-7fb2-4d15-b761-1012cefb1360-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "Embers-02ffb866-7fb2-4d15-b761-1012cefb1360/Embers-02ffb866-7fb2-4d15-b761-1012cefb1360-v10.0-vertex.glsl",
        fragmentShader: "Embers-02ffb866-7fb2-4d15-b761-1012cefb1360/Embers-02ffb866-7fb2-4d15-b761-1012cefb1360-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2
    },
    "EnvironmentDiffuse" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "EnvironmentDiffuse-0ad58bbd-42bc-484e-ad9a-b61036ff4ce7/EnvironmentDiffuse-0ad58bbd-42bc-484e-ad9a-b61036ff4ce7-v1.0-vertex.glsl",
        fragmentShader: "EnvironmentDiffuse-0ad58bbd-42bc-484e-ad9a-b61036ff4ce7/EnvironmentDiffuse-0ad58bbd-42bc-484e-ad9a-b61036ff4ce7-v1.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "EnvironmentDiffuseLightMap" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "EnvironmentDiffuseLightMap-d01d9d6c-9a61-4aba-8146-5891fafb013b/EnvironmentDiffuseLightMap-d01d9d6c-9a61-4aba-8146-5891fafb013b-v1.0-vertex.glsl",
        fragmentShader: "EnvironmentDiffuseLightMap-d01d9d6c-9a61-4aba-8146-5891fafb013b/EnvironmentDiffuseLightMap-d01d9d6c-9a61-4aba-8146-5891fafb013b-v1.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "Fire" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_MainTex: { value: "Fire-cb92b597-94ca-4255-b017-0e3f42f12f9e/Fire-cb92b597-94ca-4255-b017-0e3f42f12f9e-v10.0-MainTex.png" },
            u_time: { value: new Vector4() },
            u_EmissionGain: { value: 0.5 }
        },
        vertexShader: "Fire-cb92b597-94ca-4255-b017-0e3f42f12f9e/Fire-cb92b597-94ca-4255-b017-0e3f42f12f9e-v10.0-vertex.glsl",
        fragmentShader: "Fire-cb92b597-94ca-4255-b017-0e3f42f12f9e/Fire-cb92b597-94ca-4255-b017-0e3f42f12f9e-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 5,
        blendDstAlpha: 201,
        blendDst: 201,
        blendEquationAlpha: 100,
        blendEquation: 100,
        blendSrcAlpha: 201,
        blendSrc: 201
    },
    "Flat" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "Flat-2d35bcf0-e4d8-452c-97b1-3311be063130/Flat-2d35bcf0-e4d8-452c-97b1-3311be063130-v10.0-vertex.glsl",
        fragmentShader: "Flat-2d35bcf0-e4d8-452c-97b1-3311be063130/Flat-2d35bcf0-e4d8-452c-97b1-3311be063130-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 5,
        blendDstAlpha: 201,
        blendDst: 201,
        blendEquationAlpha: 100,
        blendEquation: 100,
        blendSrcAlpha: 201,
        blendSrc: 201,
    },
    "Highlighter" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_MainTex: { value: "Highlighter-cf019139-d41c-4eb0-a1d0-5cf54b0a42f3/Highlighter-cf019139-d41c-4eb0-a1d0-5cf54b0a42f3-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.12 }
        },
        vertexShader: "Highlighter-cf019139-d41c-4eb0-a1d0-5cf54b0a42f3/Highlighter-cf019139-d41c-4eb0-a1d0-5cf54b0a42f3-v10.0-vertex.glsl",
        fragmentShader: "Highlighter-cf019139-d41c-4eb0-a1d0-5cf54b0a42f3/Highlighter-cf019139-d41c-4eb0-a1d0-5cf54b0a42f3-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2
    },
    "Hypercolor" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_Shininess: { value: 0.5 },
            u_SpecColor: { value: new Vector3(0.2745098, 0.2745098, 0.2745098) },
            u_MainTex: { value: "Hypercolor-dce872c2-7b49-4684-b59b-c45387949c5c/Hypercolor-dce872c2-7b49-4684-b59b-c45387949c5c-v10.0-MainTex.png" },
            u_time: { value: new Vector4() },
            u_Cutoff: { value: 0.5 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_BumpMap: { value: "Hypercolor-dce872c2-7b49-4684-b59b-c45387949c5c/Hypercolor-dce872c2-7b49-4684-b59b-c45387949c5c-v10.0-BumpMap.png" },
            u_BumpMap_TexelSize: { value: new Vector4(0.0010, 0.0078, 1024, 128) },
        },
        vertexShader: "Hypercolor-dce872c2-7b49-4684-b59b-c45387949c5c/Hypercolor-dce872c2-7b49-4684-b59b-c45387949c5c-v10.0-vertex.glsl",
        fragmentShader: "Hypercolor-dce872c2-7b49-4684-b59b-c45387949c5c/Hypercolor-dce872c2-7b49-4684-b59b-c45387949c5c-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "HyperGrid" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_TintColor: { value: new Vector4(1, 1, 1, 1) },
            u_MainTex: { value: "HyperGrid-6a1cf9f9-032c-45ec-9b6e-a6680bee32e9/HyperGrid-6a1cf9f9-032c-45ec-9b6e-a6680bee32e9-v10.0-MainTex.png" }
        },
        vertexShader: "HyperGrid-6a1cf9f9-032c-45ec-9b6e-a6680bee32e9/HyperGrid-6a1cf9f9-032c-45ec-9b6e-a6680bee32e9-v10.0-vertex.glsl",
        fragmentShader: "HyperGrid-6a1cf9f9-032c-45ec-9b6e-a6680bee32e9/HyperGrid-6a1cf9f9-032c-45ec-9b6e-a6680bee32e9-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2
    },
    "Icing" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0.2352941, 0.2352941, 0.2352941) },
            u_Shininess: { value: 0.1500 },
            u_Cutoff: { value: 0.5 },
            u_MainTex: { value: "Icing-2f212815-f4d3-c1a4-681a-feeaf9c6dc37/Icing-2f212815-f4d3-c1a4-681a-feeaf9c6dc37-v10.0-BumpMap.png" },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_BumpMap: { value: "Icing-2f212815-f4d3-c1a4-681a-feeaf9c6dc37/Icing-2f212815-f4d3-c1a4-681a-feeaf9c6dc37-v10.0-BumpMap.png" },
            u_BumpMap_TexelSize: { value: new Vector4(0.0010, 0.0078, 1024, 128) },
        },
        vertexShader: "Icing-2f212815-f4d3-c1a4-681a-feeaf9c6dc37/Icing-2f212815-f4d3-c1a4-681a-feeaf9c6dc37-v10.0-vertex.glsl",
        fragmentShader: "Icing-2f212815-f4d3-c1a4-681a-feeaf9c6dc37/Icing-2f212815-f4d3-c1a4-681a-feeaf9c6dc37-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "Ink" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0.2352941, 0.2352941, 0.2352941) },
            u_Shininess: { value: 0.4 },
            u_Cutoff: { value: 0.5 },
            u_MainTex: { value: "Ink-c0012095-3ffd-4040-8ee1-fc180d346eaa/Ink-c0012095-3ffd-4040-8ee1-fc180d346eaa-v10.0-MainTex.png" },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_BumpMap: { value: "Ink-c0012095-3ffd-4040-8ee1-fc180d346eaa/Ink-c0012095-3ffd-4040-8ee1-fc180d346eaa-v10.0-BumpMap.png" },
            u_BumpMap_TexelSize: { value: new Vector4(0.0010, 0.0078, 1024, 128) },
        },
        vertexShader: "Ink-f5c336cf-5108-4b40-ade9-c687504385ab/Ink-f5c336cf-5108-4b40-ade9-c687504385ab-v10.0-vertex.glsl",
        fragmentShader: "Ink-f5c336cf-5108-4b40-ade9-c687504385ab/Ink-f5c336cf-5108-4b40-ade9-c687504385ab-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "Leaves" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.395 },
            u_Cutoff: { value: 0.5 },
            u_MainTex: { value: "Leaves-ea19de07-d0c0-4484-9198-18489a3c1487/Leaves-ea19de07-d0c0-4484-9198-18489a3c1487-v10.0-MainTex.png" },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_BumpMap: { value: "Leaves-ea19de07-d0c0-4484-9198-18489a3c1487/Leaves-ea19de07-d0c0-4484-9198-18489a3c1487-v10.0-BumpMap.png" },
            u_BumpMap_TexelSize: { value: new Vector4(0.0010, 0.0078, 1024, 128) },
        },
        vertexShader: "Leaves-ea19de07-d0c0-4484-9198-18489a3c1487/Leaves-ea19de07-d0c0-4484-9198-18489a3c1487-v10.0-vertex.glsl",
        fragmentShader: "Leaves-ea19de07-d0c0-4484-9198-18489a3c1487/Leaves-ea19de07-d0c0-4484-9198-18489a3c1487-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "Light" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_MainTex: { value: "Light-2241cd32-8ba2-48a5-9ee7-2caef7e9ed62/Light-2241cd32-8ba2-48a5-9ee7-2caef7e9ed62-v10.0-MainTex.png" },
            u_EmissionGain: { value: 0.45 },
        },
        vertexShader: "Light-2241cd32-8ba2-48a5-9ee7-2caef7e9ed62/Light-2241cd32-8ba2-48a5-9ee7-2caef7e9ed62-v10.0-vertex.glsl",
        fragmentShader: "Light-2241cd32-8ba2-48a5-9ee7-2caef7e9ed62/Light-2241cd32-8ba2-48a5-9ee7-2caef7e9ed62-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 5,
        blendDstAlpha: 201,
        blendDst: 201,
        blendEquationAlpha: 100,
        blendEquation: 100,
        blendSrcAlpha: 201,
        blendSrc: 201,
    },
    "LightWire" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_Shininess: { value: 0.81 },
            u_SpecColor: { value: new Vector3(0.3455882, 0.3455882, 0.3455882) },
            u_time: { value: new Vector4() },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_MainTex: { value: "LightWire-4391aaaa-df81-4396-9e33-31e4e4930b27/LightWire-4391aaaa-df81-4396-9e33-31e4e4930b27-v10.0-MainTex.png"}
        },
        vertexShader: "LightWire-4391aaaa-df81-4396-9e33-31e4e4930b27/LightWire-4391aaaa-df81-4396-9e33-31e4e4930b27-v10.0-vertex.glsl",
        fragmentShader: "LightWire-4391aaaa-df81-4396-9e33-31e4e4930b27/LightWire-4391aaaa-df81-4396-9e33-31e4e4930b27-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "Lofted" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 }
        },
        vertexShader: "Lofted-d381e0f5-3def-4a0d-8853-31e9200bcbda/Lofted-d381e0f5-3def-4a0d-8853-31e9200bcbda-v10.0-vertex.glsl",
        fragmentShader: "Lofted-d381e0f5-3def-4a0d-8853-31e9200bcbda/Lofted-d381e0f5-3def-4a0d-8853-31e9200bcbda-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "Marker" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_MainTex: { value: "Marker-429ed64a-4e97-4466-84d3-145a861ef684/Marker-429ed64a-4e97-4466-84d3-145a861ef684-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.067 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
        },
        vertexShader: "Marker-429ed64a-4e97-4466-84d3-145a861ef684/Marker-429ed64a-4e97-4466-84d3-145a861ef684-v10.0-vertex.glsl",
        fragmentShader: "Marker-429ed64a-4e97-4466-84d3-145a861ef684/Marker-429ed64a-4e97-4466-84d3-145a861ef684-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
        
    },
    "MatteHull" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 }
        },
        vertexShader: "MatteHull-79348357-432d-4746-8e29-0e25c112e3aa/MatteHull-79348357-432d-4746-8e29-0e25c112e3aa-v10.0-vertex.glsl",
        fragmentShader: "MatteHull-79348357-432d-4746-8e29-0e25c112e3aa/MatteHull-79348357-432d-4746-8e29-0e25c112e3aa-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
    },
    "NeonPulse" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_time: { value: new Vector4() },
            u_EmissionGain: { value: 0.5 },
        },
        vertexShader: "NeonPulse-b2ffef01-eaaa-4ab5-aa64-95a2c4f5dbc6/NeonPulse-b2ffef01-eaaa-4ab5-aa64-95a2c4f5dbc6-v10.0-vertex.glsl",
        fragmentShader: "NeonPulse-b2ffef01-eaaa-4ab5-aa64-95a2c4f5dbc6/NeonPulse-b2ffef01-eaaa-4ab5-aa64-95a2c4f5dbc6-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 5,
        blendDstAlpha: 201,
        blendDst: 201,
        blendEquationAlpha: 100,
        blendEquation: 100,
        blendSrcAlpha: 201,
        blendSrc: 201,
    },
    "OilPaint": {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0.2352941, 0.2352941, 0.2352941) },
            u_Shininess: { value: 0.4 },
            u_Cutoff: { value: 0.5 },
            u_MainTex: { value: "OilPaint-f72ec0e7-a844-4e38-82e3-140c44772699/OilPaint-f72ec0e7-a844-4e38-82e3-140c44772699-v10.0-MainTex.png" },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_BumpMap: { value: "OilPaint-f72ec0e7-a844-4e38-82e3-140c44772699/OilPaint-f72ec0e7-a844-4e38-82e3-140c44772699-v10.0-BumpMap.png" },
            u_BumpMap_TexelSize: { value: new Vector4(0.0020, 0.0020, 512, 512) },
        },
        vertexShader: "OilPaint-f72ec0e7-a844-4e38-82e3-140c44772699/OilPaint-f72ec0e7-a844-4e38-82e3-140c44772699-v10.0-vertex.glsl",
        fragmentShader: "OilPaint-f72ec0e7-a844-4e38-82e3-140c44772699/OilPaint-f72ec0e7-a844-4e38-82e3-140c44772699-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "Paper" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.145 },
            u_Cutoff: { value: 0.16 },
            u_MainTex: { value: "Paper-759f1ebd-20cd-4720-8d41-234e0da63716/Paper-759f1ebd-20cd-4720-8d41-234e0da63716-v10.0-MainTex.png" },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_BumpMap: { value: "Paper-759f1ebd-20cd-4720-8d41-234e0da63716/Paper-759f1ebd-20cd-4720-8d41-234e0da63716-v10.0-BumpMap.png" },
            u_BumpMap_TexelSize: { value: new Vector4(0.0010, 0.0078, 1024, 128) },
        },
        vertexShader: "Paper-f1114e2e-eb8d-4fde-915a-6e653b54e9f5/Paper-f1114e2e-eb8d-4fde-915a-6e653b54e9f5-v10.0-vertex.glsl",
        fragmentShader: "Paper-f1114e2e-eb8d-4fde-915a-6e653b54e9f5/Paper-f1114e2e-eb8d-4fde-915a-6e653b54e9f5-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "PbrTemplate" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "PbrTemplate-f86a096c-2f4f-4f9d-ae19-81b99f2944e0/PbrTemplate-f86a096c-2f4f-4f9d-ae19-81b99f2944e0-v1.0-vertex.glsl",
        fragmentShader: "PbrTemplate-f86a096c-2f4f-4f9d-ae19-81b99f2944e0/PbrTemplate-f86a096c-2f4f-4f9d-ae19-81b99f2944e0-v1.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "PbrTransparentTemplate" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "PbrTransparentTemplate-19826f62-42ac-4a9e-8b77-4231fbd0cfbf/PbrTransparentTemplate-19826f62-42ac-4a9e-8b77-4231fbd0cfbf-v1.0-vertex.glsl",
        fragmentShader: "PbrTransparentTemplate-19826f62-42ac-4a9e-8b77-4231fbd0cfbf/PbrTransparentTemplate-19826f62-42ac-4a9e-8b77-4231fbd0cfbf-v1.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "Petal" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.01 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
        },
        vertexShader: "Petal-e0abbc80-0f80-e854-4970-8924a0863dcc/Petal-e0abbc80-0f80-e854-4970-8924a0863dcc-v10.0-vertex.glsl",
        fragmentShader: "Petal-e0abbc80-0f80-e854-4970-8924a0863dcc/Petal-e0abbc80-0f80-e854-4970-8924a0863dcc-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    // How did an experimental brush end up here?
    "Plasma" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_MainTex: { value: "Plasma-c33714d1-b2f9-412e-bd50-1884c9d46336/Plasma-c33714d1-b2f9-412e-bd50-1884c9d46336-v10.0-MainTex.png" },
            u_time: { value: new Vector4() }
        },
        vertexShader: "Plasma-c33714d1-b2f9-412e-bd50-1884c9d46336/Plasma-c33714d1-b2f9-412e-bd50-1884c9d46336-v10.0-vertex.glsl",
        fragmentShader: "Plasma-c33714d1-b2f9-412e-bd50-1884c9d46336/Plasma-c33714d1-b2f9-412e-bd50-1884c9d46336-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "Rainbow" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_time: { value: new Vector4() },
            u_EmissionGain: { value: 0.65 }
        },
        vertexShader: "Rainbow-ad1ad437-76e2-450d-a23a-e17f8310b960/Rainbow-ad1ad437-76e2-450d-a23a-e17f8310b960-v10.0-vertex.glsl",
        fragmentShader: "Rainbow-ad1ad437-76e2-450d-a23a-e17f8310b960/Rainbow-ad1ad437-76e2-450d-a23a-e17f8310b960-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 5,
        blendDstAlpha: 201,
        blendDst: 201,
        blendEquationAlpha: 100,
        blendEquation: 100,
        blendSrcAlpha: 201,
        blendSrc: 201,
    },
    "ShinyHull" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0.1985294, 0.1985294, 0.1985294) },
            u_Shininess: { value: 0.7430 },
            u_Cutoff: { value: 0.5 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
        },
        vertexShader: "ShinyHull-faaa4d44-fcfb-4177-96be-753ac0421ba3/ShinyHull-faaa4d44-fcfb-4177-96be-753ac0421ba3-v10.0-vertex.glsl",
        fragmentShader: "ShinyHull-faaa4d44-fcfb-4177-96be-753ac0421ba3/ShinyHull-faaa4d44-fcfb-4177-96be-753ac0421ba3-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "Smoke": {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_TintColor: { value: new Vector4(1, 1, 1, 1) },
            u_MainTex: { value: "Smoke-70d79cca-b159-4f35-990c-f02193947fe8/Smoke-70d79cca-b159-4f35-990c-f02193947fe8-v10.0-MainTex.png" }
        },
        vertexShader: "Smoke-70d79cca-b159-4f35-990c-f02193947fe8/Smoke-70d79cca-b159-4f35-990c-f02193947fe8-v10.0-vertex.glsl",
        fragmentShader: "Smoke-70d79cca-b159-4f35-990c-f02193947fe8/Smoke-70d79cca-b159-4f35-990c-f02193947fe8-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2
    },
    "Snow" : {
        uniforms: {
            u_time: { value: new Vector4() },
            u_ScrollRate: { value: 0.2 },
            u_ScrollDistance: { value: new Vector3(0, -0.3, 0) },
            u_ScrollJitterIntensity: { value: 0.01 },
            u_ScrollJitterFrequency: { value: 12 },
            u_TintColor: { value: new Vector4(1, 1, 1, 1) },
            u_MainTex: { value: "Snow-d902ed8b-d0d1-476c-a8de-878a79e3a34c/Snow-d902ed8b-d0d1-476c-a8de-878a79e3a34c-v10.0-MainTex.png" },
        },
        vertexShader: "Snow-d902ed8b-d0d1-476c-a8de-878a79e3a34c/Snow-d902ed8b-d0d1-476c-a8de-878a79e3a34c-v10.0-vertex.glsl",
        fragmentShader: "Snow-d902ed8b-d0d1-476c-a8de-878a79e3a34c/Snow-d902ed8b-d0d1-476c-a8de-878a79e3a34c-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2
    },
    "SoftHighlighter" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_MainTex: { value: "SoftHighlighter-accb32f5-4509-454f-93f8-1df3fd31df1b/SoftHighlighter-accb32f5-4509-454f-93f8-1df3fd31df1b-v10.0-MainTex.png" },
        },
        vertexShader: "SoftHighlighter-accb32f5-4509-454f-93f8-1df3fd31df1b/SoftHighlighter-accb32f5-4509-454f-93f8-1df3fd31df1b-v10.0-vertex.glsl",
        fragmentShader: "SoftHighlighter-accb32f5-4509-454f-93f8-1df3fd31df1b/SoftHighlighter-accb32f5-4509-454f-93f8-1df3fd31df1b-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 5,
        blendDstAlpha: 201,
        blendDst: 201,
        blendEquationAlpha: 100,
        blendEquation: 100,
        blendSrcAlpha: 201,
        blendSrc: 201,
    },
    "Spikes" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
        },
        vertexShader: "Spikes-cf7f0059-7aeb-53a4-2b67-c83d863a9ffa/Spikes-cf7f0059-7aeb-53a4-2b67-c83d863a9ffa-v10.0-vertex.glsl",
        fragmentShader: "Spikes-cf7f0059-7aeb-53a4-2b67-c83d863a9ffa/Spikes-cf7f0059-7aeb-53a4-2b67-c83d863a9ffa-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "Splatter" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_MainTex: { value: "Splatter-7a1c8107-50c5-4b70-9a39-421576d6617e/Splatter-7a1c8107-50c5-4b70-9a39-421576d6617e-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
        },
        vertexShader: "Splatter-7a1c8107-50c5-4b70-9a39-421576d6617e/Splatter-7a1c8107-50c5-4b70-9a39-421576d6617e-v10.0-vertex.glsl",
        fragmentShader: "Splatter-7a1c8107-50c5-4b70-9a39-421576d6617e/Splatter-7a1c8107-50c5-4b70-9a39-421576d6617e-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "Stars" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_time: { value: new Vector4() },
            u_SparkleRate: { value: 5.3 },
            u_MainTex: { value: "Stars-0eb4db27-3f82-408d-b5a1-19ebd7d5b711/Stars-0eb4db27-3f82-408d-b5a1-19ebd7d5b711-v10.0-MainTex.png" },
        },
        vertexShader: "Stars-0eb4db27-3f82-408d-b5a1-19ebd7d5b711/Stars-0eb4db27-3f82-408d-b5a1-19ebd7d5b711-v10.0-vertex.glsl",
        fragmentShader: "Stars-0eb4db27-3f82-408d-b5a1-19ebd7d5b711/Stars-0eb4db27-3f82-408d-b5a1-19ebd7d5b711-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2
    },
    "Streamers" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_MainTex: { value: "Streamers-44bb800a-fbc3-4592-8426-94ecb05ddec3/Streamers-44bb800a-fbc3-4592-8426-94ecb05ddec3-v10.0-MainTex.png" },
            u_EmissionGain: { value: 0.4 },
            u_time: { value: new Vector4() },
        },
        vertexShader: "Streamers-44bb800a-fbc3-4592-8426-94ecb05ddec3/Streamers-44bb800a-fbc3-4592-8426-94ecb05ddec3-v10.0-vertex.glsl",
        fragmentShader: "Streamers-44bb800a-fbc3-4592-8426-94ecb05ddec3/Streamers-44bb800a-fbc3-4592-8426-94ecb05ddec3-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2
    },
    "Taffy" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_MainTex: { value: "Taffy-0077f88c-d93a-42f3-b59b-b31c50cdb414/Taffy-0077f88c-d93a-42f3-b59b-b31c50cdb414-v10.0-MainTex.png" },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 }
        },
        vertexShader: "Taffy-0077f88c-d93a-42f3-b59b-b31c50cdb414/Taffy-0077f88c-d93a-42f3-b59b-b31c50cdb414-v10.0-vertex.glsl",
        fragmentShader: "Taffy-0077f88c-d93a-42f3-b59b-b31c50cdb414/Taffy-0077f88c-d93a-42f3-b59b-b31c50cdb414-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "TaperedFlat" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_MainTex: { value: "TaperedFlat-b468c1fb-f254-41ed-8ec9-57030bc5660c/TaperedFlat-b468c1fb-f254-41ed-8ec9-57030bc5660c-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.067 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
        },
        vertexShader: "TaperedFlat-b468c1fb-f254-41ed-8ec9-57030bc5660c/TaperedFlat-b468c1fb-f254-41ed-8ec9-57030bc5660c-v10.0-vertex.glsl",
        fragmentShader: "TaperedFlat-b468c1fb-f254-41ed-8ec9-57030bc5660c/TaperedFlat-b468c1fb-f254-41ed-8ec9-57030bc5660c-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "TaperedMarker" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_MainTex: { value: "TaperedMarker-d90c6ad8-af0f-4b54-b422-e0f92abe1b3c/TaperedMarker-d90c6ad8-af0f-4b54-b422-e0f92abe1b3c-v10.0-MainTex.png" },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 }
        },
        vertexShader: "TaperedMarker-d90c6ad8-af0f-4b54-b422-e0f92abe1b3c/TaperedMarker-d90c6ad8-af0f-4b54-b422-e0f92abe1b3c-v10.0-vertex.glsl",
        fragmentShader: "TaperedMarker-d90c6ad8-af0f-4b54-b422-e0f92abe1b3c/TaperedMarker-d90c6ad8-af0f-4b54-b422-e0f92abe1b3c-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "TaperedMarker_Flat" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0, 0, 0) },
            u_Shininess: { value: 0.1500 },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_MainTex: { value: "TaperedMarker_Flat-1a26b8c0-8a07-4f8a-9fac-d2ef36e0cad0/TaperedMarker_Flat-1a26b8c0-8a07-4f8a-9fac-d2ef36e0cad0-v10.0-MainTex.png" },
            u_Cutoff: { value: 0.2 }
        },
        vertexShader: "TaperedMarker_Flat-1a26b8c0-8a07-4f8a-9fac-d2ef36e0cad0/TaperedMarker_Flat-1a26b8c0-8a07-4f8a-9fac-d2ef36e0cad0-v10.0-vertex.glsl",
        fragmentShader: "TaperedMarker_Flat-1a26b8c0-8a07-4f8a-9fac-d2ef36e0cad0/TaperedMarker_Flat-1a26b8c0-8a07-4f8a-9fac-d2ef36e0cad0-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "ThickPaint" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0.2352941, 0.2352941, 0.2352941) },
            u_Shininess: { value: 0.4 },
            u_Cutoff: { value: 0.5 },
            u_MainTex: { value: "ThickPaint-75b32cf0-fdd6-4d89-a64b-e2a00b247b0f/ThickPaint-75b32cf0-fdd6-4d89-a64b-e2a00b247b0f-v10.0-MainTex.png" },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_BumpMap: { value: "ThickPaint-75b32cf0-fdd6-4d89-a64b-e2a00b247b0f/ThickPaint-75b32cf0-fdd6-4d89-a64b-e2a00b247b0f-v10.0-BumpMap.png" },
            u_BumpMap_TexelSize: { value: new Vector4(0.0010, 0.0078, 1024, 128) },
        },
        vertexShader: "ThickPaint-75b32cf0-fdd6-4d89-a64b-e2a00b247b0f/ThickPaint-75b32cf0-fdd6-4d89-a64b-e2a00b247b0f-v10.0-vertex.glsl",
        fragmentShader: "ThickPaint-75b32cf0-fdd6-4d89-a64b-e2a00b247b0f/ThickPaint-75b32cf0-fdd6-4d89-a64b-e2a00b247b0f-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "Toon" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 }
        },
        vertexShader: "Toon-4391385a-df73-4396-9e33-31e4e4930b27/Toon-4391385a-df73-4396-9e33-31e4e4930b27-v10.0-vertex.glsl",
        fragmentShader: "Toon-4391385a-df73-4396-9e33-31e4e4930b27/Toon-4391385a-df73-4396-9e33-31e4e4930b27-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
    },
    "UnlitHull" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 }
        },
        vertexShader: "UnlitHull-a8fea537-da7c-4d4b-817f-24f074725d6d/UnlitHull-a8fea537-da7c-4d4b-817f-24f074725d6d-v10.0-vertex.glsl",
        fragmentShader: "UnlitHull-a8fea537-da7c-4d4b-817f-24f074725d6d/UnlitHull-a8fea537-da7c-4d4b-817f-24f074725d6d-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
    },
    "VelvetInk" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_MainTex: { value: "VelvetInk-d229d335-c334-495a-a801-660ac8a87360/VelvetInk-d229d335-c334-495a-a801-660ac8a87360-v10.0-MainTex.png" },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
        },
        vertexShader: "VelvetInk-d229d335-c334-495a-a801-660ac8a87360/VelvetInk-d229d335-c334-495a-a801-660ac8a87360-v10.0-vertex.glsl",
        fragmentShader: "VelvetInk-d229d335-c334-495a-a801-660ac8a87360/VelvetInk-d229d335-c334-495a-a801-660ac8a87360-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2
    },
    "Waveform" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_EmissionGain: { value: 0.5178571 },
            u_time: { value: new Vector4() },
            u_MainTex: { value: "Waveform-10201aa3-ebc2-42d8-84b7-2e63f6eeb8ab/Waveform-10201aa3-ebc2-42d8-84b7-2e63f6eeb8ab-v10.0-MainTex.png" },
        },
        vertexShader: "Waveform-10201aa3-ebc2-42d8-84b7-2e63f6eeb8ab/Waveform-10201aa3-ebc2-42d8-84b7-2e63f6eeb8ab-v10.0-vertex.glsl",
        fragmentShader: "Waveform-10201aa3-ebc2-42d8-84b7-2e63f6eeb8ab/Waveform-10201aa3-ebc2-42d8-84b7-2e63f6eeb8ab-v10.0-fragment.glsl",
        side: 2,
        transparent: true,
        depthFunc: 2,
        depthWrite: false,
        depthTest: true,
        blending: 2
    },
    "WetPaint" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_SpecColor: { value: new Vector3(0.1397059, 0.1397059, 0.1397059) },
            u_Shininess: { value: 0.85 },
            u_Cutoff: { value: 0.3 },
            u_MainTex: { value: "WetPaint-b67c0e81-ce6d-40a8-aeb0-ef036b081aa3/WetPaint-b67c0e81-ce6d-40a8-aeb0-ef036b081aa3-v10.0-MainTex.png" },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
            u_BumpMap: { value: "WetPaint-b67c0e81-ce6d-40a8-aeb0-ef036b081aa3/WetPaint-b67c0e81-ce6d-40a8-aeb0-ef036b081aa3-v10.0-BumpMap.png" },
            u_BumpMap_TexelSize: { value: new Vector4(0.0010, 0.0078, 1024, 128) },
        },
        vertexShader: "WetPaint-b67c0e81-ce6d-40a8-aeb0-ef036b081aa3/WetPaint-b67c0e81-ce6d-40a8-aeb0-ef036b081aa3-v10.0-vertex.glsl",
        fragmentShader: "WetPaint-b67c0e81-ce6d-40a8-aeb0-ef036b081aa3/WetPaint-b67c0e81-ce6d-40a8-aeb0-ef036b081aa3-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "WigglyGraphite" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_time: { value: new Vector4() },
            u_ambient_light_color: { value: new Vector4(0.3922, 0.3922, 0.3922, 1) },
            u_SceneLight_0_color: { value: new Vector4(0.7780, 0.8157, 0.9914, 1) },
            u_SceneLight_1_color: { value: new Vector4(0.4282, 0.4212, 0.3459, 1) },
            u_Cutoff: { value: 0.5 },
            u_MainTex: { value: "WigglyGraphite-5347acf0-a8e2-47b6-8346-30c70719d763/WigglyGraphite-5347acf0-a8e2-47b6-8346-30c70719d763-v10.0-MainTex.png" },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 },
        },
        vertexShader: "WigglyGraphite-5347acf0-a8e2-47b6-8346-30c70719d763/WigglyGraphite-5347acf0-a8e2-47b6-8346-30c70719d763-v10.0-vertex.glsl",
        fragmentShader: "WigglyGraphite-5347acf0-a8e2-47b6-8346-30c70719d763/WigglyGraphite-5347acf0-a8e2-47b6-8346-30c70719d763-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0
    },
    "Wire" : {
        uniforms: {
            u_SceneLight_0_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_SceneLight_1_matrix: { value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] },
            u_fogColor: { value: new Vector3(0.0196, 0.0196, 0.0196) },
            u_fogDensity: { value: 0 }
        },
        vertexShader: "Wire-4391385a-cf83-4396-9e33-31e4e4930b27/Wire-4391385a-cf83-4396-9e33-31e4e4930b27-v10.0-vertex.glsl",
        fragmentShader: "Wire-4391385a-cf83-4396-9e33-31e4e4930b27/Wire-4391385a-cf83-4396-9e33-31e4e4930b27-v10.0-fragment.glsl",
        side: 2,
        transparent: false,
        depthFunc: 2,
        depthWrite: true,
        depthTest: true,
        blending: 0,
    },
};

// Copyright 2021-2022 Icosa Gallery

class GLTFGoogleTiltBrushMaterialExtension {

    constructor(parser, brushPath, clock) {
        this.name = "GOOGLE_tilt_brush_material";
        this.parser = parser;

        this.brushPath = brushPath;

        // Quick repair of path if required
        if (this.brushPath.slice(this.brushPath.length - 1) !== "/") {
            this.brushPath += "/";
        }

        this.tiltShaderLoader = new TiltShaderLoader(parser.options.manager);
        this.tiltShaderLoader.setPath(brushPath);
        this.updateableMeshes = [];
        this.clock = new Clock();
    }

    beforeRoot(glTF) {
        const parser = this.parser;
        const json = parser.json;
        if (!json.extensionsUsed || !json.extensionsUsed.includes(this.name)) {
            return null;
        }

        json.materials.forEach(material => {
            const extensionsDef = material.extensions;

            if (!extensionsDef || !extensionsDef[this.name]) {
                return;
            }

            const guid = material.extensions.GOOGLE_tilt_brush_material.guid;
            const materialParams = this.tiltShaderLoader.lookupMaterial(guid);

            //MainTex
            if(material?.pbrMetallicRoughness?.baseColorTexture) {
                const mainTex = json.images[material.pbrMetallicRoughness.baseColorTexture.index];
                mainTex.uri = this.brushPath + materialParams.uniforms.u_MainTex.value;
            }

            //BumpMap
            if(material?.normalTexture) {
                const bumpMap = json.images[material.normalTexture.index];
                bumpMap.uri = this.brushPath + materialParams.uniforms.u_BumpMap.value;
            }
        });
    }

    afterRoot(glTF) {
        const parser = this.parser;
        const json = parser.json;

        if (!json.extensionsUsed || !json.extensionsUsed.includes(this.name)) {
            return null;
        }

        const shaderResolves = [];

        //const extensionDef = json.exensions[this.name];
        for(const scene of glTF.scenes) {
            scene.traverse(async object => {
                const association = parser.associations.get(object);

                if (association === undefined || association.type !== "nodes") {
                    return;
                }

                const node = json.nodes[association.index];
                if (node.mesh === undefined) {
                    return;
                }

                const prim = json.meshes[node.mesh].primitives[0];
                const mat = json.materials[prim.material];
                const extensionsDef = mat.extensions;

                if (!extensionsDef || !extensionsDef[this.name]) {
                    return;
                }
                
                const guid = extensionsDef.GOOGLE_tilt_brush_material.guid;

                shaderResolves.push(this.replaceMaterial(object, guid));
            });
        }

        return Promise.all(shaderResolves);
    }

    async replaceMaterial(mesh, guid) {
        let shader;
        let updateTime = false;
        let updateCamera = false;

        switch(guid) {
            case "0e87b49c-6546-3a34-3a44-8a556d7d6c3e":
                mesh.geometry.name = "geometry_BlocksBasic";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                //mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("BlocksBasic");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_BlocksBasic";
                break;
            case "232998f8-d357-47a2-993a-53415df9be10":
                mesh.geometry.name = "geometry_BlocksGem";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                //mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("BlocksGem");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_BlocksGem";
                break;
            case "3d813d82-5839-4450-8ddc-8e889ecd96c7":
                mesh.geometry.name = "geometry_BlocksGlass";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                //mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("BlocksGlass");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_BlocksGlass";
                break;

            case "89d104cd-d012-426b-b5b3-bbaee63ac43c":
                mesh.geometry.name = "geometry_Bubbles";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("_tb_unity_normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                mesh.geometry.setAttribute("a_texcoord1", mesh.geometry.getAttribute("_tb_unity_texcoord_1"));
                shader = await this.tiltShaderLoader.loadAsync("Bubbles");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Bubbles";
                break;

            case "700f3aa8-9a7c-2384-8b8a-ea028905dd8c":
                mesh.geometry.name = "geometry_CelVinyl";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("CelVinyl");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_CelVinyl";
                break;

            case "0f0ff7b2-a677-45eb-a7d6-0cd7206f4816":
                mesh.geometry.name = "geometry_ChromaticWave";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("ChromaticWave");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_ChromaticWave";
                updateTime = true;
                break;

            case "1161af82-50cf-47db-9706-0c3576d43c43":
            case "79168f10-6961-464a-8be1-57ed364c5600":
                mesh.geometry.name = "geometry_CoarseBristles";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("CoarseBristles");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_CoarseBristles";
                break;

            case "1caa6d7d-f015-3f54-3a4b-8b5354d39f81":
                mesh.geometry.name = "geometry_Comet";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("Comet");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Comet";
                updateTime = true;
                break;

            case "c8313697-2563-47fc-832e-290f4c04b901":
                mesh.geometry.name = "geometry_DiamondHull";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("DiamondHull");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_DiamondHull";
                updateTime = true;
                updateCamera = true;
                break;

            case "4391aaaa-df73-4396-9e33-31e4e4930b27":
                mesh.geometry.name = "geometry_Disco";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("Disco");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Disco";
                updateTime = true;
                break;

            case "d1d991f2-e7a0-4cf1-b328-f57e915e6260":
                mesh.geometry.name = "geometry_DotMarker";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("DotMarker");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_DotMarker";
                break;

            case "6a1cf9f9-032c-45ec-9b1d-a6680bee30f7":
                mesh.geometry.name = "geometry_Dots";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("_tb_unity_normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                mesh.geometry.setAttribute("a_texcoord1", mesh.geometry.getAttribute("_tb_unity_texcoord_1"));
                shader = await this.tiltShaderLoader.loadAsync("Dots");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Dots";
                break;

            case "0d3889f3-3ede-470c-8af4-f44813306126":
                mesh.geometry.name = "geometry_DoubleTaperedFlat";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("DoubleTaperedFlat");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_DoubleTaperedFlat";
                break;

            case "0d3889f3-3ede-470c-8af4-de4813306126":
                mesh.geometry.name = "geometry_DoubleTaperedMarker";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("DoubleTaperedMarker");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_DoubleTaperedMarker";
                break;

            case "d0262945-853c-4481-9cbd-88586bed93cb":
            case "3ca16e2f-bdcd-4da2-8631-dcef342f40f1":
                mesh.geometry.name = "geometry_DuctTape";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("DuctTape");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_DuctTape";
                break;

            case "f6e85de3-6dcc-4e7f-87fd-cee8c3d25d51":
                mesh.geometry.name = "geometry_Electricity";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                mesh.geometry.setAttribute("a_texcoord1", mesh.geometry.getAttribute("_tb_unity_texcoord_1"));
                shader = await this.tiltShaderLoader.loadAsync("Electricity");
                mesh.material = shader;
                mesh.material.name = "material_Electricity";
                updateTime = true;
                break;

            case "02ffb866-7fb2-4d15-b761-1012cefb1360":
                mesh.geometry.name = "geometry_Embers";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("_tb_unity_normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                mesh.geometry.setAttribute("a_texcoord1", mesh.geometry.getAttribute("_tb_unity_texcoord_1"));
                shader = await this.tiltShaderLoader.loadAsync("Embers");
                mesh.material = shader;
                mesh.material.name = "material_Embers";
                updateTime = true;
                break;

            case "0ad58bbd-42bc-484e-ad9a-b61036ff4ce7":
                mesh.geometry.name = "geometry_EnvironmentDiffuse";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("EnvironmentDiffuse");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_EnvironmentDiffuse";
                break;

            case "d01d9d6c-9a61-4aba-8146-5891fafb013b":
                mesh.geometry.name = "geometry_EnvironmentDiffuseLightMap";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("EnvironmentDiffuseLightMap");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_EnvironmentDiffuseLightMap";
                break;

            case "cb92b597-94ca-4255-b017-0e3f42f12f9e":
                mesh.geometry.name = "geometry_Fire";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("Fire");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Fire";
                updateTime = true;
                break;

            case "2d35bcf0-e4d8-452c-97b1-3311be063130":
            case "280c0a7a-aad8-416c-a7d2-df63d129ca70":
            case "55303bc4-c749-4a72-98d9-d23e68e76e18":
                mesh.geometry.name = "geometry_Flat";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("Flat");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Flat";
                break;

            case "cf019139-d41c-4eb0-a1d0-5cf54b0a42f3":
                mesh.geometry.name = "geometry_Highlighter";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("Highlighter");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Highlighter";
                break;

            case "dce872c2-7b49-4684-b59b-c45387949c5c":
            case "e8ef32b1-baa8-460a-9c2c-9cf8506794f5":
                mesh.geometry.name = "geometry_Hypercolor";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("Hypercolor");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Hypercolor";
                updateTime = true;
                break;

            case "6a1cf9f9-032c-45ec-9b6e-a6680bee32e9":
                mesh.geometry.name = "geometry_HyperGrid";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                mesh.geometry.setAttribute("a_texcoord1", mesh.geometry.getAttribute("_tb_unity_texcoord_1"));
                shader = await this.tiltShaderLoader.loadAsync("HyperGrid");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_HyperGrid";
                break;

            case "2f212815-f4d3-c1a4-681a-feeaf9c6dc37":
                mesh.geometry.name = "geometry_Icing";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));

                shader = await this.tiltShaderLoader.loadAsync("Icing");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Icing";
                break;

            case "f5c336cf-5108-4b40-ade9-c687504385ab":
            case "c0012095-3ffd-4040-8ee1-fc180d346eaa":
                mesh.geometry.name = "geometry_Ink";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("Ink");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Ink";
                break;

            case "4a76a27a-44d8-4bfe-9a8c-713749a499b0":
            case "ea19de07-d0c0-4484-9198-18489a3c1487":
                mesh.geometry.name = "geometry_Leaves";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("Leaves");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Leaves";
                break;

            case "2241cd32-8ba2-48a5-9ee7-2caef7e9ed62":
                mesh.geometry.name = "geometry_Light";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("Light");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Light";
                break;

            case "4391aaaa-df81-4396-9e33-31e4e4930b27":
                mesh.geometry.name = "geometry_LightWire";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("LightWire");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_LightWire";
                updateTime = true;
                break;

            case "d381e0f5-3def-4a0d-8853-31e9200bcbda":
                mesh.geometry.name = "geometry_Lofted";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("Lofted");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Lofted";
                break;

            case "429ed64a-4e97-4466-84d3-145a861ef684":
                mesh.geometry.name = "geometry_Marker";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("Marker");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Marker";
                break;

            case "79348357-432d-4746-8e29-0e25c112e3aa":
                mesh.geometry.name = "geometry_MatteHull";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                shader = await this.tiltShaderLoader.loadAsync("MatteHull");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_MatteHull";
                break;

            case "b2ffef01-eaaa-4ab5-aa64-95a2c4f5dbc6":
                mesh.geometry.name = "geometry_NeonPulse";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("NeonPulse");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_NeonPulse";
                updateTime = true;
                break;

            case "f72ec0e7-a844-4e38-82e3-140c44772699":
            case "c515dad7-4393-4681-81ad-162ef052241b":
                mesh.geometry.name = "geometry_OilPaint";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("OilPaint");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_OilPaint";
                break;

            case "f1114e2e-eb8d-4fde-915a-6e653b54e9f5":
            case "759f1ebd-20cd-4720-8d41-234e0da63716":
                mesh.geometry.name = "geometry_Paper";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("Paper");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Paper";
                break;

            case "f86a096c-2f4f-4f9d-ae19-81b99f2944e0":
                mesh.geometry.name = "geometry_PbrTemplate";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("PbrTemplate");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_PbrTemplate";
                break;

            case "19826f62-42ac-4a9e-8b77-4231fbd0cfbf":
                mesh.geometry.name = "geometry_PbrTransparentTemplate";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("PbrTransparentTemplate");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_PbrTransparentTemplate";
                break;

            case "e0abbc80-0f80-e854-4970-8924a0863dcc":
                mesh.geometry.name = "geometry_Petal";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("Petal");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Petal";
                break;

            case "c33714d1-b2f9-412e-bd50-1884c9d46336":
                mesh.geometry.name = "geometry_Plasma";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("Plasma");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Plasma";
                updateTime = true;
                break;

            case "ad1ad437-76e2-450d-a23a-e17f8310b960":
                mesh.geometry.name = "geometry_Rainbow";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("Rainbow");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Rainbow";
                updateTime = true;
                break;

            case "faaa4d44-fcfb-4177-96be-753ac0421ba3":
                mesh.geometry.name = "geometry_ShinyHull";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("ShinyHull");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_ShinyHull";
                break;

            case "70d79cca-b159-4f35-990c-f02193947fe8":
                mesh.geometry.name = "geometry_Smoke";
                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("_tb_unity_normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                mesh.geometry.setAttribute("a_texcoord1", mesh.geometry.getAttribute("_tb_unity_texcoord_1"));
                shader = await this.tiltShaderLoader.loadAsync("Smoke");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Smoke";
                break;

            case "d902ed8b-d0d1-476c-a8de-878a79e3a34c":
                mesh.geometry.name = "geometry_Snow";
                
                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("_tb_unity_normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                mesh.geometry.setAttribute("a_texcoord1", mesh.geometry.getAttribute("_tb_unity_texcoord_1"));
                shader = await this.tiltShaderLoader.loadAsync("Snow");
                mesh.material = shader;
                mesh.material.name = "material_Snow";
                updateTime = true;
                break;

            case "accb32f5-4509-454f-93f8-1df3fd31df1b":
                mesh.geometry.name = "geometry_SoftHighlighter";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("SoftHighlighter");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_SoftHighlighter";
                break;

            case "cf7f0059-7aeb-53a4-2b67-c83d863a9ffa":
                mesh.geometry.name = "geometry_Spikes";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("Spikes");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Spikes";
                break;

            case "8dc4a70c-d558-4efd-a5ed-d4e860f40dc3":
            case "7a1c8107-50c5-4b70-9a39-421576d6617e":
                mesh.geometry.name = "geometry_Splatter";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("Splatter");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Splatter";
                break;

            case "0eb4db27-3f82-408d-b5a1-19ebd7d5b711":
                mesh.geometry.name = "geometry_Stars";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("_tb_unity_normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                mesh.geometry.setAttribute("a_texcoord1", mesh.geometry.getAttribute("_tb_unity_texcoord_1"));
                shader = await this.tiltShaderLoader.loadAsync("Stars");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Stars";
                updateTime = true;
                break;

            case "44bb800a-fbc3-4592-8426-94ecb05ddec3":
                mesh.geometry.name = "geometry_Streamers";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("Streamers");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Streamers";
                updateTime = true;
                break;

            case "0077f88c-d93a-42f3-b59b-b31c50cdb414":
                mesh.geometry.name = "geometry_Taffy";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("Taffy");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Taffy";
                updateTime = true;
                break;

            case "b468c1fb-f254-41ed-8ec9-57030bc5660c":
            case "c8ccb53d-ae13-45ef-8afb-b730d81394eb":
                mesh.geometry.name = "geometry_TaperedFlat";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("TaperedFlat");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_TaperedFlat";
                break;

            case "d90c6ad8-af0f-4b54-b422-e0f92abe1b3c":
            case "1a26b8c0-8a07-4f8a-9fac-d2ef36e0cad0":
                mesh.geometry.name = "geometry_TaperedMarker";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("TaperedMarker");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_TaperedMarker";
                break;

            case "75b32cf0-fdd6-4d89-a64b-e2a00b247b0f":
            case "fdf0326a-c0d1-4fed-b101-9db0ff6d071f":
                mesh.geometry.name = "geometry_ThickPaint";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("ThickPaint");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_ThickPaint";
                break;

            case "4391385a-df73-4396-9e33-31e4e4930b27":
                mesh.geometry.name = "geometry_Toon";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                shader = await this.tiltShaderLoader.loadAsync("Toon");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Toon";
                break;

            case "a8fea537-da7c-4d4b-817f-24f074725d6d":
                mesh.geometry.name = "geometry_UnlitHull";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                shader = await this.tiltShaderLoader.loadAsync("UnlitHull");
                mesh.material = shader;
                mesh.material.name = "material_UnlitHull";
                break;

            case "d229d335-c334-495a-a801-660ac8a87360":
                mesh.geometry.name = "geometry_VelvetInk";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("VelvetInk");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_VelvetInk";
                break;

            case "10201aa3-ebc2-42d8-84b7-2e63f6eeb8ab":
                mesh.geometry.name = "geometry_Waveform";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("Waveform");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_Waveform";
                updateTime = true;
                break;

            case "b67c0e81-ce6d-40a8-aeb0-ef036b081aa3":
            case "dea67637-cd1a-27e4-c9b1-52f4bbcb84e5":
                mesh.geometry.name = "geometry_WetPaint";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("WetPaint");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_WetPaint";
                break;

            case "5347acf0-a8e2-47b6-8346-30c70719d763":
            case "e814fef1-97fd-7194-4a2f-50c2bb918be2":
                mesh.geometry.name = "geometry_WigglyGraphite";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                mesh.geometry.setAttribute("a_texcoord0", mesh.geometry.getAttribute("_tb_unity_texcoord_0"));
                shader = await this.tiltShaderLoader.loadAsync("WigglyGraphite");
                shader.lights = true;
                shader.uniformsNeedUpdate = true;
                mesh.material = shader;
                mesh.material.name = "material_WigglyGraphite";
                updateTime = true;
                break;

            case "4391385a-cf83-4396-9e33-31e4e4930b27":
                mesh.geometry.name = "geometry_Wire";

                mesh.geometry.setAttribute("a_position", mesh.geometry.getAttribute("position"));
                mesh.geometry.setAttribute("a_normal", mesh.geometry.getAttribute("normal"));
                mesh.geometry.setAttribute("a_color", mesh.geometry.getAttribute("color"));
                shader = await this.tiltShaderLoader.loadAsync("Wire");
                mesh.material = shader;
                mesh.material.name = "material_Wire";
                break;
            default:
                console.warn(`Could not find brush with guid ${guid}!`);
        }
        
        mesh.onBeforeRender = (renderer, scene, camera, geometry, material, group) => {
            // Check for any dynamic uniforms set.
            if(updateTime || updateCamera) {
                const elapsedTime = this.clock.getElapsedTime();
                // _Time from https://docs.unity3d.com/Manual/SL-UnityShaderVariables.html
                const time = new Vector4(elapsedTime/20, elapsedTime, elapsedTime*2, elapsedTime*3);
                if (updateTime) {
                    material.uniforms["u_time"].value = time;
                }
                if (updateCamera) {
                    material.uniforms["cameraPosition"].value = camera.position;
                }
            }

            if(material?.uniforms?.directionalLights?.value) {
                // Main Light
                if(material.uniforms.directionalLights.value[0]) {
                    
                    // Color
                    if(material.uniforms.u_SceneLight_0_color) {
                        const color = material.uniforms.directionalLights.value[0].color;
                        material.uniforms.u_SceneLight_0_color.value = new Vector4(color.r, color.g, color.b, 1);
                    }
                }

                // Shadow Light
                if(material.uniforms.directionalLights.value[1]) {
    
                    // Color
                    if(material.uniforms.u_SceneLight_1_color) {
                        const color = material.uniforms.directionalLights.value[1].color;
                        material.uniforms.u_SceneLight_1_color.value = new Vector4(color.r, color.g, color.b, 1);
                    }
                }
            }

            // Ambient Light
            // if(material?.uniforms?.ambientLightColor?.value) {
            //     if(material.uniforms.u_ambient_light_color) {
            //         const colorArray = material.uniforms.ambientLightColor.value;
            //         material.uniforms.u_ambient_light_color.value = new Vector4(colorArray[0], colorArray[1], colorArray[2], 1);
            //     }
            // }
        };
    }
}

export { GLTFGoogleTiltBrushMaterialExtension };
