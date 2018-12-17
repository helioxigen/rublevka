import { dateAndTimeToIso8601 } from 'core/helpers';

const createTemplate = values => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="x-ua-compatible" content="IE=edge">
    <title>New Email Template</title>
    <style type="text/css">
      table td{
        border:0 solid #000;
      }
      body,table,td,a{
        -webkit-text-size-adjust:100%;
        -ms-text-size-adjust:100%;
      }
      table,td{
        mso-table-lspace:0;
        mso-table-rspace:0;
      }
      img{
        -ms-interpolation-mode:bicubic;
      }
      img{
        border:0;
        outline:none;
        text-decoration:none;
      }
      table,tr,td{
        border-collapse:collapse !important;
      }
      body{
        margin:0 !important;
        padding:0 !important;
        width:100% !important;
      }
      a[x-apple-data-detectors]{
        color:inherit !important;
        text-decoration:none !important;
        font-size:inherit !important;
        font-family:inherit !important;
        font-weight:inherit !important;
        line-height:inherit !important;
      }
      div[style*=margin: 16px 0;]{
        margin:0 !important;
      }
        @media all and (max-width:639px){
          .wrapper{
            width:320px !important;
            padding:0 !important;
          }

      }  @media all and (max-width:639px){
          .container{
            width:300px !important;
            padding:0 !important;
          }

      }  @media all and (max-width:639px){
          .mobile{
            width:300px !important;
            display:block !important;
            padding:0 !important;
          }

      }  @media all and (max-width:639px){
          .img{
            width:100% !important;
            height:auto !important;
          }

      }  @media all and (max-width:639px){
          [class=mobileOff]{
            width:0 !important;
            display:none !important;
          }

      }  @media all and (max-width:639px){
          [class*=mobileOn]{
            display:block !important;
            max-height:none !important;
          }

      }  @media all and (max-width:639px){
          .noMobPAdding{
            margin-left:0 !important;
            padding-left:0 !important;
          }

      }  @media all and (max-width:639px){
          .mailBody{
            margin-left:10px !important;
            margin-right:20px !important;
          }

      }  @media all and (max-width:639px){
          table.noMobPAdding p{
            margin-bottom:30px !important;
          }

      }  @media all and (max-width:639px){
          a img{
            width:280px !important;
          }

      }  @media all and (max-width:639px){
          [class=noMobPAdding]{
            margin-left:0 !important;
            padding-left:0 !important;
          }

      }  @media all and (max-width:639px){
          .mail_footer img{
            width:20px !important;
          }

      }  @media all and (max-width:639px){
          .headlogo img{
            width:${values.site === 'jq.estate' ? '80px' : '200px'} !important;
          }

      }
      </style>
    </head>

    <body style="margin:0; padding:0; background-color:#F2F2F2;">
      ${values.template}
    </body>
  </html>
`;

const replaceStyleToAttr = template =>
  template
    .replace(/style="text-align:center;vertical-align:top;"/g, 'align="center" valign="top"')
    .replace(/style="text-align:left;vertical-align:top;"/g, 'align="left" valign="top"');
// .replace(/text-align:left/g, 'align="left"')
// .replace(/text-align:right/g, 'align="right"')

export default (values) => {
  const scheduledAtDate = values._sendNow ? Date.now() : values.scheduledAtDate;
  const scheduledAtTime = values._sendNow ? Date.now() : values.scheduledAtTime;

  return {
    id: values.id,
    title: values.title,
    template: replaceStyleToAttr(createTemplate(values)),
    scheduledAt: dateAndTimeToIso8601(scheduledAtDate, scheduledAtTime, 3),
    state: values.state,
    properties: [],
    listId: values.listId,
    fromEmail: values.fromEmail,
    fromTitle: values.fromTitle,
  };
};
