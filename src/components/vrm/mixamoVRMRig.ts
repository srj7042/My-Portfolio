import * as THREE from 'three';
import { VRM } from '@pixiv/three-vrm';

/**
 * Mixamo to VRM Humanoid Bone Mapping Dictionary
 */
export const MIXAMO_TO_VRM_BONE_MAP: Record<string, string> = {
  mixamorigHips: 'hips',
  mixamorigSpine: 'spine',
  mixamorigSpine1: 'chest',
  mixamorigSpine2: 'upperChest',
  mixamorigNeck: 'neck',
  mixamorigHead: 'head',
  mixamorigLeftShoulder: 'leftShoulder',
  mixamorigLeftArm: 'leftUpperArm',
  mixamorigLeftForeArm: 'leftLowerArm',
  mixamorigLeftHand: 'leftHand',
  mixamorigRightShoulder: 'rightShoulder',
  mixamorigRightArm: 'rightUpperArm',
  mixamorigRightForeArm: 'rightLowerArm',
  mixamorigRightHand: 'rightHand',
  mixamorigLeftUpLeg: 'leftUpperLeg',
  mixamorigLeftLeg: 'leftLowerLeg',
  mixamorigLeftFoot: 'leftFoot',
  mixamorigRightUpLeg: 'rightUpperLeg',
  mixamorigRightLeg: 'rightLowerLeg',
  mixamorigRightFoot: 'rightFoot',
};

/**
 * Generates a procedural VRM Wave AnimationClip retargeted for standard VRM humanoid bones.
 */
export function createVRMWaveClip(vrm: VRM): THREE.AnimationClip {
  const tracks: THREE.KeyframeTrack[] = [];
  const times = [0, 0.4, 0.8, 1.2, 1.6, 2.0, 2.6];

  const getBoneName = (vrmBoneName: string) => {
    const node = vrm.humanoid?.getNormalizedBoneNode(vrmBoneName as any);
    return node ? node.name : null;
  };

  const rightUpperArmName = getBoneName('rightUpperArm');
  const rightLowerArmName = getBoneName('rightLowerArm');
  const rightHandName = getBoneName('rightHand');
  const headName = getBoneName('head');

  const eulerToQuat = (x: number, y: number, z: number) => {
    const e = new THREE.Euler(
      THREE.MathUtils.degToRad(x),
      THREE.MathUtils.degToRad(y),
      THREE.MathUtils.degToRad(z),
      'XYZ'
    );
    const q = new THREE.Quaternion().setFromEuler(e);
    return [q.x, q.y, q.z, q.w];
  };

  // Right upper arm raises and stays elevated
  if (rightUpperArmName) {
    tracks.push(
      new THREE.QuaternionKeyframeTrack(
        `${rightUpperArmName}.quaternion`,
        times,
        [
          ...eulerToQuat(0, 0, 0),
          ...eulerToQuat(0, 0, 75),
          ...eulerToQuat(0, 0, 75),
          ...eulerToQuat(0, 0, 75),
          ...eulerToQuat(0, 0, 75),
          ...eulerToQuat(0, 0, 70),
          ...eulerToQuat(0, 0, 0),
        ],
        THREE.InterpolateLinear
      )
    );
  }

  // Right lower arm (forearm) waves back and forth
  if (rightLowerArmName) {
    tracks.push(
      new THREE.QuaternionKeyframeTrack(
        `${rightLowerArmName}.quaternion`,
        times,
        [
          ...eulerToQuat(0, 0, 0),
          ...eulerToQuat(0, 0, 45),
          ...eulerToQuat(0, 0, 15),
          ...eulerToQuat(0, 0, 45),
          ...eulerToQuat(0, 0, 15),
          ...eulerToQuat(0, 0, 40),
          ...eulerToQuat(0, 0, 0),
        ],
        THREE.InterpolateLinear
      )
    );
  }

  // Right hand wrist wiggle
  if (rightHandName) {
    tracks.push(
      new THREE.QuaternionKeyframeTrack(
        `${rightHandName}.quaternion`,
        times,
        [
          ...eulerToQuat(0, 0, 0),
          ...eulerToQuat(0, 0, 20),
          ...eulerToQuat(0, 0, -15),
          ...eulerToQuat(0, 0, 20),
          ...eulerToQuat(0, 0, -15),
          ...eulerToQuat(0, 0, 10),
          ...eulerToQuat(0, 0, 0),
        ],
        THREE.InterpolateLinear
      )
    );
  }

  // Head tilts with warm greeting
  if (headName) {
    tracks.push(
      new THREE.QuaternionKeyframeTrack(
        `${headName}.quaternion`,
        times,
        [
          ...eulerToQuat(0, 0, 0),
          ...eulerToQuat(3, -4, 5),
          ...eulerToQuat(2, 2, -3),
          ...eulerToQuat(3, -4, 5),
          ...eulerToQuat(2, 2, -3),
          ...eulerToQuat(2, 0, 2),
          ...eulerToQuat(0, 0, 0),
        ],
        THREE.InterpolateLinear
      )
    );
  }

  return new THREE.AnimationClip('VRMWave', 2.6, tracks);
}

/**
 * Retargets an imported Mixamo AnimationClip to a VRM model.
 * Translates Mixamo track names and coordinate systems into VRM humanoid nodes.
 */
export function retargetMixamoClipToVRM(
  mixamoClip: THREE.AnimationClip,
  vrm: THREE.Object3D | VRM
): THREE.AnimationClip {
  const tracks: THREE.KeyframeTrack[] = [];
  const typedVRM = vrm as VRM;

  mixamoClip.tracks.forEach((track) => {
    const trackSplits = track.name.split('.');
    const mixamoBoneName = trackSplits[0];
    const propertyName = trackSplits[1];

    const vrmBoneName = MIXAMO_TO_VRM_BONE_MAP[mixamoBoneName];
    if (!vrmBoneName || !typedVRM.humanoid) return;

    const vrmNode = typedVRM.humanoid.getNormalizedBoneNode(vrmBoneName as any);
    if (!vrmNode) return;

    if (propertyName === 'quaternion') {
      tracks.push(
        new THREE.QuaternionKeyframeTrack(
          `${vrmNode.name}.quaternion`,
          Array.from(track.times),
          Array.from(track.values)
        )
      );
    } else if (propertyName === 'position' && vrmBoneName === 'hips') {
      // Hips translation with root scaling
      const scaledValues = Array.from(track.values).map((v) => v * 0.01);
      tracks.push(
        new THREE.VectorKeyframeTrack(
          `${vrmNode.name}.position`,
          Array.from(track.times),
          scaledValues
        )
      );
    }
  });

  return new THREE.AnimationClip(
    mixamoClip.name || 'RetargetedMixamoAnimation',
    mixamoClip.duration,
    tracks
  );
}
