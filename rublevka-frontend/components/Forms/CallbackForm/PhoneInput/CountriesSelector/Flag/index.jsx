import React from 'react';
import styled from 'styled-components';

const Flag = ({ className, code }) => (
    <span className={className}>
        <span className={`flag flag-${code}`} />
    </span>
);

export default styled(Flag)`
    display: flex;
    align-items: center;
    width: 20px;
    height: 15px;

    position: relative;

    .flag {
        background-image: url('/static/countries/spritesheet.png');
        background-repeat: no-repeat;
        display: block;

        transform: scale(0.2);
        transform-origin: left;
        position: absolute;

        border-radius: 5px;

        box-shadow: 0px 0px 4px 0px #888;
    }

    .flag-ad {
        width: 100px;
        height: 70px;
        background-position: -5px -5px;
    }

    .flag-ae {
        width: 100px;
        height: 50px;
        background-position: -115px -5px;
    }

    .flag-af {
        width: 100px;
        height: 67px;
        background-position: -225px -5px;
    }

    .flag-ag {
        width: 100px;
        height: 67px;
        background-position: -335px -5px;
    }

    .flag-ai {
        width: 100px;
        height: 50px;
        background-position: -445px -5px;
    }

    .flag-al {
        width: 100px;
        height: 71px;
        background-position: -555px -5px;
    }

    .flag-am {
        width: 100px;
        height: 50px;
        background-position: -665px -5px;
    }

    .flag-an {
        width: 100px;
        height: 67px;
        background-position: -775px -5px;
    }

    .flag-ao {
        width: 100px;
        height: 67px;
        background-position: -885px -5px;
    }

    .flag-aq {
        width: 100px;
        height: 100px;
        background-position: -995px -5px;
    }

    .flag-ar {
        width: 100px;
        height: 63px;
        background-position: -1105px -5px;
    }

    .flag-as {
        width: 100px;
        height: 50px;
        background-position: -1215px -5px;
    }

    .flag-at {
        width: 100px;
        height: 67px;
        background-position: -115px -65px;
    }

    .flag-au {
        width: 100px;
        height: 50px;
        background-position: -445px -65px;
    }

    .flag-aw {
        width: 100px;
        height: 67px;
        background-position: -665px -65px;
    }

    .flag-ax {
        width: 100px;
        height: 65px;
        background-position: -1215px -65px;
    }

    .flag-az {
        width: 100px;
        height: 50px;
        background-position: -5px -140px;
    }

    .flag-ba {
        width: 100px;
        height: 50px;
        background-position: -225px -140px;
    }

    .flag-bb {
        width: 100px;
        height: 67px;
        background-position: -335px -140px;
    }

    .flag-bd {
        width: 100px;
        height: 60px;
        background-position: -445px -140px;
    }

    .flag-be {
        width: 100px;
        height: 87px;
        background-position: -555px -140px;
    }

    .flag-bf {
        width: 100px;
        height: 67px;
        background-position: -775px -140px;
    }

    .flag-bg {
        width: 100px;
        height: 60px;
        background-position: -885px -140px;
    }

    .flag-bh {
        width: 100px;
        height: 60px;
        background-position: -995px -140px;
    }

    .flag-bi {
        width: 100px;
        height: 60px;
        background-position: -1105px -140px;
    }

    .flag-bj {
        width: 100px;
        height: 67px;
        background-position: -1215px -140px;
    }

    .flag-bl {
        width: 100px;
        height: 67px;
        background-position: -5px -217px;
    }

    .flag-bm {
        width: 100px;
        height: 50px;
        background-position: -115px -217px;
    }

    .flag-bn {
        width: 100px;
        height: 50px;
        background-position: -225px -217px;
    }

    .flag-bo {
        width: 100px;
        height: 68px;
        background-position: -335px -217px;
    }

    .flag-bq {
        width: 100px;
        height: 67px;
        background-position: -445px -217px;
    }

    .flag-br {
        width: 100px;
        height: 70px;
        background-position: -665px -217px;
    }

    .flag-bs {
        width: 100px;
        height: 50px;
        background-position: -775px -217px;
    }

    .flag-bt {
        width: 100px;
        height: 67px;
        background-position: -885px -217px;
    }

    .flag-bv {
        width: 100px;
        height: 73px;
        background-position: -995px -217px;
    }

    .flag-bw {
        width: 100px;
        height: 67px;
        background-position: -1105px -217px;
    }

    .flag-by {
        width: 100px;
        height: 50px;
        background-position: -1215px -217px;
    }

    .flag-bz {
        width: 100px;
        height: 67px;
        background-position: -115px -277px;
    }

    .flag-ca {
        width: 100px;
        height: 50px;
        background-position: -225px -277px;
    }

    .flag-cc {
        width: 100px;
        height: 50px;
        background-position: -555px -277px;
    }

    .flag-cd {
        width: 100px;
        height: 75px;
        background-position: -775px -277px;
    }

    .flag-cf {
        width: 100px;
        height: 67px;
        background-position: -1215px -277px;
    }

    .flag-cg {
        width: 100px;
        height: 67px;
        background-position: -5px -354px;
    }

    .flag-ch {
        width: 100px;
        height: 100px;
        background-position: -115px -354px;
    }

    .flag-ci {
        width: 100px;
        height: 67px;
        background-position: -225px -354px;
    }

    .flag-ck {
        width: 100px;
        height: 50px;
        background-position: -335px -354px;
    }

    .flag-cl {
        width: 100px;
        height: 67px;
        background-position: -445px -354px;
    }

    .flag-cm {
        width: 100px;
        height: 67px;
        background-position: -555px -354px;
    }

    .flag-cn {
        width: 100px;
        height: 67px;
        background-position: -665px -354px;
    }

    .flag-co {
        width: 100px;
        height: 67px;
        background-position: -885px -354px;
    }

    .flag-cr {
        width: 100px;
        height: 60px;
        background-position: -995px -354px;
    }

    .flag-cu {
        width: 100px;
        height: 50px;
        background-position: -1105px -354px;
    }

    .flag-cv {
        width: 100px;
        height: 59px;
        background-position: -1215px -354px;
    }

    .flag-cw {
        width: 100px;
        height: 67px;
        background-position: -335px -423px;
    }

    .flag-cx {
        width: 100px;
        height: 50px;
        background-position: -775px -423px;
    }

    .flag-cy {
        width: 100px;
        height: 67px;
        background-position: -1105px -423px;
    }

    .flag-cz {
        width: 100px;
        height: 67px;
        background-position: -1215px -423px;
    }

    .flag-de {
        width: 100px;
        height: 60px;
        background-position: -5px -500px;
    }

    .flag-dj {
        width: 100px;
        height: 67px;
        background-position: -115px -500px;
    }

    .flag-dk {
        width: 100px;
        height: 76px;
        background-position: -225px -500px;
    }

    .flag-dm {
        width: 100px;
        height: 50px;
        background-position: -335px -500px;
    }

    .flag-do {
        width: 100px;
        height: 67px;
        background-position: -445px -500px;
    }

    .flag-dz {
        width: 100px;
        height: 67px;
        background-position: -555px -500px;
    }

    .flag-ec {
        width: 100px;
        height: 67px;
        background-position: -665px -500px;
    }

    .flag-ee {
        width: 100px;
        height: 64px;
        background-position: -775px -500px;
    }

    .flag-eg {
        width: 100px;
        height: 67px;
        background-position: -885px -500px;
    }

    .flag-eh {
        width: 100px;
        height: 50px;
        background-position: -995px -500px;
    }

    .flag-er {
        width: 100px;
        height: 50px;
        background-position: -1105px -500px;
    }

    .flag-es {
        width: 100px;
        height: 67px;
        background-position: -1215px -500px;
    }

    .flag-et {
        width: 100px;
        height: 50px;
        background-position: -5px -577px;
    }

    .flag-eu {
        width: 100px;
        height: 67px;
        background-position: -115px -577px;
    }

    .flag-fi {
        width: 100px;
        height: 61px;
        background-position: -335px -577px;
    }

    .flag-fj {
        width: 100px;
        height: 50px;
        background-position: -445px -577px;
    }

    .flag-fk {
        width: 100px;
        height: 50px;
        background-position: -555px -577px;
    }

    .flag-fm {
        width: 100px;
        height: 53px;
        background-position: -665px -577px;
    }

    .flag-fo {
        width: 100px;
        height: 73px;
        background-position: -775px -577px;
    }

    .flag-fr {
        width: 100px;
        height: 67px;
        background-position: -885px -577px;
    }

    .flag-ga {
        width: 100px;
        height: 75px;
        background-position: -995px -577px;
    }

    .flag-gb {
        width: 100px;
        height: 50px;
        background-position: -1105px -577px;
    }

    .flag-gb-eng {
        width: 100px;
        height: 60px;
        background-position: -1215px -577px;
    }

    .flag-gb-nir {
        width: 100px;
        height: 50px;
        background-position: -5px -647px;
    }

    .flag-gb-sct {
        width: 100px;
        height: 60px;
        background-position: -225px -647px;
    }

    .flag-gb-wls {
        width: 100px;
        height: 60px;
        background-position: -445px -647px;
    }

    .flag-gd {
        width: 100px;
        height: 60px;
        background-position: -555px -647px;
    }

    .flag-ge {
        width: 100px;
        height: 67px;
        background-position: -665px -647px;
    }

    .flag-gf {
        width: 100px;
        height: 67px;
        background-position: -1105px -647px;
    }

    .flag-gg {
        width: 100px;
        height: 67px;
        background-position: -1215px -647px;
    }

    .flag-gh {
        width: 100px;
        height: 67px;
        background-position: -5px -724px;
    }

    .flag-gi {
        width: 100px;
        height: 50px;
        background-position: -115px -724px;
    }

    .flag-gl {
        width: 100px;
        height: 67px;
        background-position: -225px -724px;
    }

    .flag-gm {
        width: 100px;
        height: 67px;
        background-position: -335px -724px;
    }

    .flag-gn {
        width: 100px;
        height: 67px;
        background-position: -445px -724px;
    }

    .flag-gp {
        width: 100px;
        height: 67px;
        background-position: -555px -724px;
    }

    .flag-gq {
        width: 100px;
        height: 67px;
        background-position: -665px -724px;
    }

    .flag-gr {
        width: 100px;
        height: 67px;
        background-position: -775px -724px;
    }

    .flag-gs {
        width: 100px;
        height: 50px;
        background-position: -885px -724px;
    }

    .flag-gt {
        width: 100px;
        height: 63px;
        background-position: -995px -724px;
    }

    .flag-gu {
        width: 100px;
        height: 54px;
        background-position: -1105px -724px;
    }

    .flag-gw {
        width: 100px;
        height: 50px;
        background-position: -1215px -724px;
    }

    .flag-gy {
        width: 100px;
        height: 60px;
        background-position: -115px -784px;
    }

    .flag-hk {
        width: 100px;
        height: 67px;
        background-position: -885px -784px;
    }

    .flag-hm {
        width: 100px;
        height: 50px;
        background-position: -1215px -784px;
    }

    .flag-hn {
        width: 100px;
        height: 50px;
        background-position: -5px -844px;
    }

    .flag-hr {
        width: 100px;
        height: 50px;
        background-position: -225px -844px;
    }

    .flag-ht {
        width: 100px;
        height: 60px;
        background-position: -335px -844px;
    }

    .flag-hu {
        width: 100px;
        height: 50px;
        background-position: -445px -844px;
    }

    .flag-id {
        width: 100px;
        height: 67px;
        background-position: -555px -844px;
    }

    .flag-ie {
        width: 100px;
        height: 50px;
        background-position: -665px -844px;
    }

    .flag-il {
        width: 100px;
        height: 73px;
        background-position: -775px -844px;
    }

    .flag-im {
        width: 100px;
        height: 50px;
        background-position: -995px -844px;
    }

    .flag-in {
        width: 100px;
        height: 67px;
        background-position: -1105px -844px;
    }

    .flag-io {
        width: 100px;
        height: 50px;
        background-position: -1215px -844px;
    }

    .flag-iq {
        width: 100px;
        height: 67px;
        background-position: -5px -904px;
    }

    .flag-ir {
        width: 100px;
        height: 57px;
        background-position: -115px -904px;
    }

    .flag-is {
        width: 100px;
        height: 72px;
        background-position: -225px -904px;
    }

    .flag-it {
        width: 100px;
        height: 67px;
        background-position: -445px -904px;
    }

    .flag-je {
        width: 100px;
        height: 60px;
        background-position: -665px -904px;
    }

    .flag-jm {
        width: 100px;
        height: 50px;
        background-position: -885px -904px;
    }

    .flag-jo {
        width: 100px;
        height: 50px;
        background-position: -995px -904px;
    }

    .flag-jp {
        width: 100px;
        height: 67px;
        background-position: -1215px -904px;
    }

    .flag-ke {
        width: 100px;
        height: 67px;
        background-position: -5px -981px;
    }

    .flag-kg {
        width: 100px;
        height: 60px;
        background-position: -115px -981px;
    }

    .flag-kh {
        width: 100px;
        height: 64px;
        background-position: -335px -981px;
    }

    .flag-ki {
        width: 100px;
        height: 50px;
        background-position: -445px -981px;
    }

    .flag-km {
        width: 100px;
        height: 60px;
        background-position: -555px -981px;
    }

    .flag-kn {
        width: 100px;
        height: 67px;
        background-position: -665px -981px;
    }

    .flag-kp {
        width: 100px;
        height: 50px;
        background-position: -775px -981px;
    }

    .flag-kr {
        width: 100px;
        height: 67px;
        background-position: -885px -981px;
    }

    .flag-kw {
        width: 100px;
        height: 50px;
        background-position: -995px -981px;
    }

    .flag-ky {
        width: 100px;
        height: 50px;
        background-position: -1105px -981px;
    }

    .flag-kz {
        width: 100px;
        height: 50px;
        background-position: -1215px -981px;
    }

    .flag-la {
        width: 100px;
        height: 67px;
        background-position: -225px -1041px;
    }

    .flag-lb {
        width: 100px;
        height: 67px;
        background-position: -445px -1041px;
    }

    .flag-lc {
        width: 100px;
        height: 50px;
        background-position: -775px -1041px;
    }

    .flag-li {
        width: 100px;
        height: 60px;
        background-position: -995px -1041px;
    }

    .flag-lk {
        width: 100px;
        height: 50px;
        background-position: -1105px -1041px;
    }

    .flag-lr {
        width: 100px;
        height: 53px;
        background-position: -1215px -1041px;
    }

    .flag-ls {
        width: 100px;
        height: 67px;
        background-position: -5px -1104px;
    }

    .flag-lt {
        width: 100px;
        height: 60px;
        background-position: -115px -1104px;
    }

    .flag-lu {
        width: 100px;
        height: 60px;
        background-position: -335px -1104px;
    }

    .flag-lv {
        width: 100px;
        height: 50px;
        background-position: -555px -1104px;
    }

    .flag-ly {
        width: 100px;
        height: 50px;
        background-position: -665px -1104px;
    }

    .flag-ma {
        width: 100px;
        height: 67px;
        background-position: -775px -1104px;
    }

    .flag-mc {
        width: 100px;
        height: 80px;
        background-position: -885px -1104px;
    }

    .flag-md {
        width: 100px;
        height: 50px;
        background-position: -1105px -1104px;
    }

    .flag-me {
        width: 100px;
        height: 50px;
        background-position: -1215px -1104px;
    }

    .flag-mf {
        width: 100px;
        height: 67px;
        background-position: -225px -1164px;
    }

    .flag-mg {
        width: 100px;
        height: 67px;
        background-position: -445px -1164px;
    }

    .flag-mh {
        width: 100px;
        height: 53px;
        background-position: -555px -1164px;
    }

    .flag-mk {
        width: 100px;
        height: 50px;
        background-position: -665px -1164px;
    }

    .flag-ml {
        width: 100px;
        height: 67px;
        background-position: -995px -1164px;
    }

    .flag-mm {
        width: 100px;
        height: 67px;
        background-position: -1105px -1164px;
    }

    .flag-mn {
        width: 100px;
        height: 50px;
        background-position: -1215px -1164px;
    }

    .flag-mo {
        width: 100px;
        height: 67px;
        background-position: -5px -1224px;
    }

    .flag-mp {
        width: 100px;
        height: 50px;
        background-position: -115px -1224px;
    }

    .flag-mq {
        width: 100px;
        height: 67px;
        background-position: -335px -1224px;
    }

    .flag-mr {
        width: 100px;
        height: 67px;
        background-position: -665px -1224px;
    }

    .flag-ms {
        width: 100px;
        height: 50px;
        background-position: -775px -1224px;
    }

    .flag-mt {
        width: 100px;
        height: 67px;
        background-position: -885px -1224px;
    }

    .flag-mu {
        width: 100px;
        height: 67px;
        background-position: -1215px -1224px;
    }

    .flag-mv {
        width: 100px;
        height: 67px;
        background-position: -5px -1301px;
    }

    .flag-mw {
        width: 100px;
        height: 67px;
        background-position: -115px -1301px;
    }

    .flag-mx {
        width: 100px;
        height: 57px;
        background-position: -225px -1301px;
    }

    .flag-my {
        width: 100px;
        height: 50px;
        background-position: -335px -1301px;
    }

    .flag-mz {
        width: 100px;
        height: 67px;
        background-position: -445px -1301px;
    }

    .flag-na {
        width: 100px;
        height: 67px;
        background-position: -555px -1301px;
    }

    .flag-nc {
        width: 100px;
        height: 50px;
        background-position: -665px -1301px;
    }

    .flag-ne {
        width: 100px;
        height: 86px;
        background-position: -775px -1301px;
    }

    .flag-nf {
        width: 100px;
        height: 50px;
        background-position: -885px -1301px;
    }

    .flag-ng {
        width: 100px;
        height: 50px;
        background-position: -995px -1301px;
    }

    .flag-ni {
        width: 100px;
        height: 60px;
        background-position: -1105px -1301px;
    }

    .flag-nl {
        width: 100px;
        height: 67px;
        background-position: -1215px -1301px;
    }

    .flag-no {
        width: 100px;
        height: 73px;
        background-position: -1325px -5px;
    }

    .flag-np {
        width: 100px;
        height: 122px;
        background-position: -1325px -88px;
    }

    .flag-nr {
        width: 100px;
        height: 50px;
        background-position: -1325px -220px;
    }

    .flag-nu {
        width: 100px;
        height: 50px;
        background-position: -1325px -280px;
    }

    .flag-nz {
        width: 100px;
        height: 50px;
        background-position: -1325px -340px;
    }

    .flag-om {
        width: 100px;
        height: 50px;
        background-position: -1325px -400px;
    }

    .flag-pa {
        width: 100px;
        height: 67px;
        background-position: -1325px -460px;
    }

    .flag-pe {
        width: 100px;
        height: 67px;
        background-position: -1325px -537px;
    }

    .flag-pf {
        width: 100px;
        height: 67px;
        background-position: -1325px -614px;
    }

    .flag-pg {
        width: 100px;
        height: 75px;
        background-position: -1325px -691px;
    }

    .flag-ph {
        width: 100px;
        height: 50px;
        background-position: -1325px -776px;
    }

    .flag-pk {
        width: 100px;
        height: 67px;
        background-position: -1325px -836px;
    }

    .flag-pl {
        width: 100px;
        height: 63px;
        background-position: -1325px -913px;
    }

    .flag-pm {
        width: 100px;
        height: 67px;
        background-position: -1325px -986px;
    }

    .flag-pn {
        width: 100px;
        height: 50px;
        background-position: -1325px -1063px;
    }

    .flag-pr {
        width: 100px;
        height: 67px;
        background-position: -1325px -1123px;
    }

    .flag-ps {
        width: 100px;
        height: 50px;
        background-position: -1325px -1200px;
    }

    .flag-pt {
        width: 100px;
        height: 67px;
        background-position: -1325px -1260px;
    }

    .flag-pw {
        width: 100px;
        height: 63px;
        background-position: -1325px -1337px;
    }

    .flag-py {
        width: 100px;
        height: 55px;
        background-position: -5px -1410px;
    }

    .flag-qa {
        width: 100px;
        height: 24px;
        background-position: -5px -88px;
    }

    .flag-re {
        width: 100px;
        height: 67px;
        background-position: -115px -1410px;
    }

    .flag-ro {
        width: 100px;
        height: 67px;
        background-position: -225px -1410px;
    }

    .flag-rs {
        width: 100px;
        height: 67px;
        background-position: -335px -1410px;
    }

    .flag-ru {
        width: 100px;
        height: 67px;
        background-position: -445px -1410px;
    }

    .flag-rw {
        width: 100px;
        height: 67px;
        background-position: -555px -1410px;
    }

    .flag-sa {
        width: 100px;
        height: 67px;
        background-position: -665px -1410px;
    }

    .flag-sb {
        width: 100px;
        height: 50px;
        background-position: -775px -1410px;
    }

    .flag-sc {
        width: 100px;
        height: 50px;
        background-position: -885px -1410px;
    }

    .flag-sd {
        width: 100px;
        height: 50px;
        background-position: -995px -1410px;
    }

    .flag-se {
        width: 100px;
        height: 63px;
        background-position: -1105px -1410px;
    }

    .flag-sg {
        width: 100px;
        height: 67px;
        background-position: -1215px -1410px;
    }

    .flag-sh {
        width: 100px;
        height: 50px;
        background-position: -1325px -1410px;
    }

    .flag-si {
        width: 100px;
        height: 50px;
        background-position: -1435px -5px;
    }

    .flag-sj {
        width: 100px;
        height: 73px;
        background-position: -1435px -65px;
    }

    .flag-sk {
        width: 100px;
        height: 67px;
        background-position: -1435px -148px;
    }

    .flag-sl {
        width: 100px;
        height: 67px;
        background-position: -1435px -225px;
    }

    .flag-sm {
        width: 100px;
        height: 75px;
        background-position: -1435px -302px;
    }

    .flag-sn {
        width: 100px;
        height: 67px;
        background-position: -1435px -387px;
    }

    .flag-so {
        width: 100px;
        height: 67px;
        background-position: -1435px -464px;
    }

    .flag-sr {
        width: 100px;
        height: 67px;
        background-position: -1435px -541px;
    }

    .flag-ss {
        width: 100px;
        height: 50px;
        background-position: -115px -148px;
    }

    .flag-st {
        width: 100px;
        height: 50px;
        background-position: -665px -148px;
    }

    .flag-sv {
        width: 100px;
        height: 56px;
        background-position: -1435px -618px;
    }

    .flag-sx {
        width: 100px;
        height: 67px;
        background-position: -1435px -684px;
    }

    .flag-sy {
        width: 100px;
        height: 67px;
        background-position: -1435px -761px;
    }

    .flag-sz {
        width: 100px;
        height: 67px;
        background-position: -1435px -838px;
    }

    .flag-tc {
        width: 100px;
        height: 50px;
        background-position: -335px -915px;
    }

    .flag-td {
        width: 100px;
        height: 67px;
        background-position: -1435px -915px;
    }

    .flag-tf {
        width: 100px;
        height: 67px;
        background-position: -1435px -992px;
    }

    .flag-tg {
        width: 100px;
        height: 62px;
        background-position: -1435px -1069px;
    }

    .flag-th {
        width: 100px;
        height: 67px;
        background-position: -1435px -1141px;
    }

    .flag-tj {
        width: 100px;
        height: 50px;
        background-position: -1435px -1218px;
    }

    .flag-tk {
        width: 100px;
        height: 50px;
        background-position: -1435px -1278px;
    }

    .flag-tl {
        width: 100px;
        height: 50px;
        background-position: -1435px -1338px;
    }

    .flag-tm {
        width: 100px;
        height: 67px;
        background-position: -1435px -1398px;
    }

    .flag-tn {
        width: 100px;
        height: 67px;
        background-position: -5px -1475px;
    }

    .flag-to {
        width: 100px;
        height: 50px;
        background-position: -775px -1475px;
    }

    .flag-tr {
        width: 100px;
        height: 67px;
        background-position: -885px -1475px;
    }

    .flag-tt {
        width: 100px;
        height: 60px;
        background-position: -995px -1475px;
    }

    .flag-tv {
        width: 100px;
        height: 50px;
        background-position: -1325px -1475px;
    }

    .flag-tw {
        width: 100px;
        height: 67px;
        background-position: -1435px -1475px;
    }

    .flag-tz {
        width: 100px;
        height: 67px;
        background-position: -1545px -5px;
    }

    .flag-ua {
        width: 100px;
        height: 67px;
        background-position: -1545px -82px;
    }

    .flag-ug {
        width: 100px;
        height: 67px;
        background-position: -1545px -159px;
    }

    .flag-um {
        width: 100px;
        height: 53px;
        background-position: -1545px -236px;
    }

    .flag-us {
        width: 100px;
        height: 53px;
        background-position: -1545px -299px;
    }

    .flag-uy {
        width: 100px;
        height: 67px;
        background-position: -1545px -362px;
    }

    .flag-uz {
        width: 100px;
        height: 50px;
        background-position: -775px -362px;
    }

    .flag-va {
        width: 100px;
        height: 100px;
        background-position: -1545px -439px;
    }

    .flag-vc {
        width: 100px;
        height: 67px;
        background-position: -1545px -549px;
    }

    .flag-ve {
        width: 100px;
        height: 67px;
        background-position: -1545px -626px;
    }

    .flag-vg {
        width: 100px;
        height: 50px;
        background-position: -5px -439px;
    }

    .flag-vi {
        width: 100px;
        height: 67px;
        background-position: -1545px -703px;
    }

    .flag-vn {
        width: 100px;
        height: 67px;
        background-position: -1545px -780px;
    }

    .flag-vu {
        width: 100px;
        height: 60px;
        background-position: -1545px -857px;
    }

    .flag-wf {
        width: 100px;
        height: 67px;
        background-position: -1545px -927px;
    }

    .flag-ws {
        width: 100px;
        height: 50px;
        background-position: -225px -439px;
    }

    .flag-xk {
        width: 100px;
        height: 71px;
        background-position: -1545px -1004px;
    }

    .flag-ye {
        width: 100px;
        height: 67px;
        background-position: -1545px -1085px;
    }

    .flag-yt {
        width: 100px;
        height: 67px;
        background-position: -1545px -1162px;
    }

    .flag-za {
        width: 100px;
        height: 67px;
        background-position: -1545px -1239px;
    }

    .flag-zm {
        width: 100px;
        height: 67px;
        background-position: -1545px -1316px;
    }

    .flag-zw {
        width: 100px;
        height: 50px;
        background-position: -445px -439px;
    }
`;
