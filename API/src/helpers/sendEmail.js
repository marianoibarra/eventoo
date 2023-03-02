const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = (to, url, name, template) => {
  const emailTemplates = {
    resetPassword: `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  
    <head>
      <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <title></title>
  
      <style type="text/css">
        @media only screen and (min-width: 620px) {
          .u-row {
            width: 100% !important;
            max-width: 1024px !important
          }
          .u-row .u-col {
            vertical-align: top;
          }
          .u-row .u-col-100 {
            width: 1024px !important;
          }
        }
        
        @media (max-width: 620px) {
          .u-row-container {
            max-width: 100% !important;
            padding-left: 0px !important;
            padding-right: 0px !important;
          }
          .u-row .u-col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }
          .u-row {
            width: 100% !important;
          }
          .u-col {
            width: 100% !important;
          }
          .u-col>div {
            margin: 0 auto;
          }
        }
        
        body {
          margin: 0;
          padding: 0;
        }
        
        table,
        tr,
        td {
          vertical-align: top;
          border-collapse: collapse;
        }
        
        p {
          margin: 0;
        }
        
        .ie-container table,
        .mso-container table {
          table-layout: fixed;
        }
        
        * {
          line-height: inherit;
        }
        
        a[x-apple-data-detectors='true'] {
          color: inherit !important;
          text-decoration: none !important;
        }
        
        table,
        td {
          color: #000000;
        }
        
        #u_body a {
          color: #0000ee;
          text-decoration: underline;
        }
      </style>
  
  
  
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
      <!--<![endif]-->
  
    </head>
  
    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
      <!--[if IE]><div class="ie-container"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
  
  
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 1024px;width: 100%;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #005d5e;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #005d5e;"><![endif]-->
  
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 320px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
  
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  
                                  <h1 style="margin: 0px; color: #ffffff; line-height: 150%; text-align: center; word-wrap: break-word; font-weight: normal; font-size: 28px;">Eventoo</h1>
  
                                </td>
                              </tr>
                            </tbody>
                          </table>
  
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
  
  
  
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 100%px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
  
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
  
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:'Cabin',sans-serif;" align="left">
  
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
  
                                        <img align="center" border="0" src="https://cdn.templates.unlayer.com/assets/1597218650916-xxxxc.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 26%;max-width: 150.8px;"
                                          width="150.8" />
  
                                      </td>
                                    </tr>
                                  </table>
  
                                </td>
                              </tr>
                            </tbody>
                          </table>
  
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 31px;font-family:'Cabin',sans-serif;" align="left">
  
                                  <div style="color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">Reset password</span></strong>
                                      </span>
                                    </p>
                                  </div>
  
                                </td>
                              </tr>
                            </tbody>
                          </table>
  
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
  
  
  
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 100%;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
  
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 100%;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
  
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" max-width="600px" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
  
                                  <div style="line-height: 160%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; margin-bottom: 16px; line-height: 160%;"><span style="font-size: 22px; line-height: 35.2px;">Hi ${name}, </span></p>
                                    <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">We received a request to reset your Eventoo account password:</span></p>
                                    <p style="font-size: 14px; margin: 8px 0; line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">${to}</span></p>
                                    <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">We are here to help you! Just click the button to set a new password</span></p>
                                  </div>
  
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr  >
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif" align="left">
  
                                  <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                  <div style="max-width: 500px; margin:auto" align="center">
                                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46px; v-text-anchor:middle; width:374px;" arcsize="8.5%"  stroke="f" fillcolor=""><w:anchorlock/><center style="color:#FFFFFF;font-family:'Cabin',sans-serif;"><![endif]-->
                                    <a href="${url}" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;font-family:'Cabin',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #bc4000; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:65%; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
                                      <span style="display:block;padding:14px 44px 13px;line-height:120%;"><span style="font-size: 16px; line-height: 19.2px;"><strong><span style="line-height: 19.2px; font-size: 16px;">Reset Password</span></strong>
                                      </span>
                                      </span>
                                    </a>
                                    <!--[if mso]></center></v:roundrect><![endif]-->
                                  </div>
  
                                </td>
                              </tr>
                            </tbody>
                          </table>
  
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:'Cabin',sans-serif;" align="left">
  
                                  <div style="max-width:540px; margin:auto;line-height: 160%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">If you didn't request the password change, don't worry.</span><span style="font-size: 18px; line-height: 28.8px;"></span></p>
                                    <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">Your password is still secure and you can delete this email.</span><span style="font-size: 18px; line-height: 28.8px;"></span></p>
                                    <p style="line-height: 160%; font-size: 14px;"> </p>
                                    <p style="line-height: 160%; font-size: 14px; text-align: right;"><span style="font-size: 18px; line-height: 28.8px;">Regards, Eventoo's Team</span></p>
                                  </div>
  
                                </td>
                              </tr>
                            </tbody>
                          </table>
  
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
  
  
  
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #e1ebeb;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #e1ebeb;"><![endif]-->
  
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
  
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:30px;font-family:'Cabin',sans-serif;" align="left">
  
                                  <div style="color: #007f80; line-height: 150%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 150%;"><span style="font-size: 20px; line-height: 30px;"><strong>Get in touch</strong></span></p>
                                    <p style="font-size: 14px; line-height: 150%;"><span style="text-decoration: underline; font-size: 14px; line-height: 21px;"><span style="font-size: 12px; line-height: 18px; color: #bc4000; text-decoration: underline;">+11 111 333 4444</span></span>
                                    </p>
                                    <p style="font-size: 14px; line-height: 150%;"><span style="text-decoration: underline; font-size: 14px; line-height: 21px;"><span style="font-size: 12px; line-height: 18px; color: #bc4000; text-decoration: underline;">info@eventoo.com.ar</span></span>
                                    </p>
                                  </div>
  
                                </td>
                              </tr>
                            </tbody>
                          </table>
  
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 33px;font-family:'Cabin',sans-serif;" align="left">
  
                                  <div align="center">
                                    <div style="display: table; max-width:244px;">
                                      <!--[if (mso)|(IE)]><table width="244" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:244px;"><tr><![endif]-->
  
  
                                      <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                      <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                        <tbody>
                                          <tr style="vertical-align: top">
                                            <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                              <a href="https://facebook.com/" title="Facebook" target="_blank">
                                                <img src="https://cdn.tools.unlayer.com/social/icons/circle/facebook.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <!--[if (mso)|(IE)]></td><![endif]-->
  
                                      <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                      <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                        <tbody>
                                          <tr style="vertical-align: top">
                                            <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                              <a href="https://linkedin.com/" title="LinkedIn" target="_blank">
                                                <img src="https://cdn.tools.unlayer.com/social/icons/circle/linkedin.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <!--[if (mso)|(IE)]></td><![endif]-->
  
                                      <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                      <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                        <tbody>
                                          <tr style="vertical-align: top">
                                            <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                              <a href="https://instagram.com/" title="Instagram" target="_blank">
                                                <img src="https://cdn.tools.unlayer.com/social/icons/circle/instagram.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <!--[if (mso)|(IE)]></td><![endif]-->
  
                                      <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                      <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                        <tbody>
                                          <tr style="vertical-align: top">
                                            <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                              <a href="https://youtube.com/" title="YouTube" target="_blank">
                                                <img src="https://cdn.tools.unlayer.com/social/icons/circle/youtube.png" alt="YouTube" title="YouTube" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <!--[if (mso)|(IE)]></td><![endif]-->
  
                                      <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                      <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                        <tbody>
                                          <tr style="vertical-align: top">
                                            <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                              <a href="mailto:notifications@eventoo.site" title="Email" target="_blank">
                                                <img src="https://cdn.tools.unlayer.com/social/icons/circle/email.png" alt="Email" title="Email" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <!--[if (mso)|(IE)]></td><![endif]-->
  
  
                                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                    </div>
                                  </div>
  
                                </td>
                              </tr>
                            </tbody>
                          </table>
  
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
  
  
  
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
  
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
  
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  
                                  <div style="color: #fafafa; line-height: 180%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 180%;"><span style="font-size: 16px; line-height: 28.8px;">Eventoo © Company All Rights Reserved</span></p>
                                  </div>
  
                                </td>
                              </tr>
                            </tbody>
                          </table>
  
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
  
  
              <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
      <!--[if mso]></div><![endif]-->
      <!--[if IE]></div><![endif]-->
    </body>
  
    </html>`,
    confirmEmail: `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
    <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 620px) {
        .u-row {
          max-width: 1024px !important;
          width: 100%;
        }
        .u-row .u-col {
          vertical-align: top;
        }
        .u-row .u-col-100 {
          max-width: 1024px !important;
          width: 100%;
        }
      }
      
      @media (max-width: 620px) {
        .u-row-container {
          max-width: 100% !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
        .u-row .u-col {
          min-width: 320px !important;
          max-width: 100% !important;
          display: block !important;
        }
        .u-row {
          width: 100% !important;
        }
        .u-col {
          width: 100% !important;
        }
        .u-col>div {
          margin: 0 auto;
        }
      }
      
      body {
        margin: 0;
        padding: 0;
      }
      
      table,
      tr,
      td {
        vertical-align: top;
        border-collapse: collapse;
      }
      
      p {
        margin: 0;
      }
      
      .ie-container table,
      .mso-container table {
        table-layout: fixed;
      }
      
      * {
        line-height: inherit;
      }
      
      a[x-apple-data-detectors='true'] {
        color: inherit !important;
        text-decoration: none !important;
      }
      
      table,
      td {
        color: #000000;
      }
      
      #u_body a {
        color: #0000ee;
        text-decoration: underline;
      }
    </style>
  
  
  
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
    <!--<![endif]-->
  
  </head>
  
  <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
      <tbody>
        <tr style="vertical-align: top">
          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 1024px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                        <!--<![endif]-->
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 1024px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #005d5e;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #005d5e;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                        <!--<![endif]-->
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  
                                <h1 style="margin: 0px; color: #ffffff; line-height: 250%; text-align: center; word-wrap: break-word; font-weight: normal; font-size: 28px;">Eventoo</h1>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 1024px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                        <!--<![endif]-->
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:'Cabin',sans-serif;" align="left">
  
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td style="padding-right: 0px;padding-left: 0px;" align="center">
  
                                      <img align="center" border="0" src="https://cdn.templates.unlayer.com/assets/1597218650916-xxxxc.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 26%;max-width: 150.8px;"
                                        width="150.8" />
  
                                    </td>
                                  </tr>
                                </table>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  
                                <div style="color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                <p style="font-size: 14px; letter-spacing: 3.5px; text-transform: uppercase; line-height: 140%;"><strong>Thanks for signing up!</strong></p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 31px;font-family:'Cabin',sans-serif;" align="left">
  
                                <div style="color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">Verify Your E-mail Address </span></strong>
                                    </span>
                                  </p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 640px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;max-width: 640px;margin: auto;width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                        <!--<![endif]-->
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
  
                                <div style="line-height: 160%; text-align: center; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 22px; line-height: 35.2px;">Hi ${name}, </span></p>
                                  <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">You are almost ready to start. Enter the code below to verify your email address and start enjoying Eventoo! </span></p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="center">
  
                                <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                <div align="center">
                                  <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46px; v-text-anchor:middle; width:377px;" arcsize="8.5%"  stroke="f" fillcolor="#bc4000"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Cabin',sans-serif;"><![endif]-->
                                  <div class="v-button" style="box-sizing: border-box;display: inline-block;font-family:'Cabin',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #bc4000; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; margin: auto; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
                                    <span style="display:block;padding:17px 36px 16px;line-height:120%;"><span style="font-size: 16px; line-height: 19.2px;"><strong><span style="line-height: 19.2px; font-size: 20px;">${url.slice(
                                      0,
                                      3
                                    )}-${url.slice(3)}</span></strong>
                                    </span>
                                    </span>
                                  </div>
                                  <!--[if mso]></center></v:roundrect><![endif]-->
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:'Cabin',sans-serif;" align="left">
  
                                <div style="line-height: 160%; text-align: center; word-wrap: break-word;">
                                  <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">Thanks,</span></p>
                                  <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">Eventoo's Team</span></p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 1024px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #e1ebeb;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #e1ebeb;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                        <!--<![endif]-->
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:41px;font-family:'Cabin',sans-serif;" align="left">
  
                                <div style="color: #007f80; line-height: 160%; text-align: center; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 20px; line-height: 32px;"><strong>Get in touch</strong></span></p>
                                  <p style="font-size: 14px; line-height: 160%;"><span style="text-decoration: underline; font-size: 14px; line-height: 22.4px;"><span style="font-size: 12px; line-height: 19.2px; color: #bc4000; text-decoration: underline;">+11 111 333 4444</span></span>
                                  </p>
                                  <p style="font-size: 14px; line-height: 160%;"><span style="text-decoration: underline; font-size: 14px; line-height: 22.4px;"><span style="font-size: 12px; line-height: 19.2px; color: #bc4000; text-decoration: underline;">info@eventoo.com.ar</span></span>
                                  </p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 33px;font-family:'Cabin',sans-serif;" align="left">
  
                                <div align="center">
                                  <div style="display: table; max-width:244px;">
                                    <!--[if (mso)|(IE)]><table width="244" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:244px;"><tr><![endif]-->
  
  
                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                            <a href="https://facebook.com/" title="Facebook" target="_blank">
                                              <img src="https://cdn.tools.unlayer.com/social/icons/circle/facebook.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
  
                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                            <a href="https://linkedin.com/" title="LinkedIn" target="_blank">
                                              <img src="https://cdn.tools.unlayer.com/social/icons/circle/linkedin.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
  
                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                            <a href="https://instagram.com/" title="Instagram" target="_blank">
                                              <img src="https://cdn.tools.unlayer.com/social/icons/circle/instagram.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
  
                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                            <a href="https://youtube.com/" title="YouTube" target="_blank">
                                              <img src="https://cdn.tools.unlayer.com/social/icons/circle/youtube.png" alt="YouTube" title="YouTube" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
  
                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                            <a href="mailto:notifications@eventoo.site" title="Email" target="_blank">
                                              <img src="https://cdn.tools.unlayer.com/social/icons/circle/email.png" alt="Email" title="Email" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
  
  
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                  </div>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                        <!--<![endif]-->
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  
                                <div style="color: #fafafa; line-height: 180%; text-align: center; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 180%;"><span style="font-size: 16px; line-height: 28.8px;">Eventoo © Company All Rights Reserved</span></p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>
  
    </html>`,
  };

  const subjectTemplates = {
    resetPassword: "Reset your password",
    confirmEmail: "Confirm your Eventoo's account",
  };

  var transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    secureConnection: false,
    port: 465,
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  var message = {
    from: `Eventoo <${process.env.EMAIL_USER}>`,
    to,
    subject: subjectTemplates[template],
    text: "Plaintext version of the message",
    html: emailTemplates[template],
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log("Error enviando email");
      console.log(error.message);
    } else {
      console.log("Email enviado");
    }
  });
};

const sendBuyerNotifications = (to, template, pdf,eventId) => {
  const emailTemplates = {
    reserveTickets: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
     <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
     
     <head>
       <!--[if gte mso 9]>
     <xml>
       <o:OfficeDocumentSettings>
         <o:AllowPNG/>
         <o:PixelsPerInch>96</o:PixelsPerInch>
       </o:OfficeDocumentSettings>
     </xml>
     <![endif]-->
       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <meta name="x-apple-disable-message-reformatting">
       <!--[if !mso]><!-->
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <!--<![endif]-->
       <title></title>
     
       <style type="text/css">
         @media only screen and (min-width: 620px) {
           .u-row {
             width: 600px !important;
           }
           .u-row .u-col {
             vertical-align: top;
           }
           .u-row .u-col-100 {
             width: 600px !important;
           }
         }
         
         @media (max-width: 620px) {
           .u-row-container {
             max-width: 100% !important;
             padding-left: 0px !important;
             padding-right: 0px !important;
           }
           .u-row .u-col {
             min-width: 320px !important;
             max-width: 100% !important;
             display: block !important;
           }
           .u-row {
             width: 100% !important;
           }
           .u-col {
             width: 100% !important;
           }
           .u-col>div {
             margin: 0 auto;
           }
         }
         
         body {
           margin: 0;
           padding: 0;
         }
         
         table,
         tr,
         td {
           vertical-align: top;
           border-collapse: collapse;
         }
         
         p {
           margin: 0;
         }
         
         .ie-container table,
         .mso-container table {
           table-layout: fixed;
         }
         
         * {
           line-height: inherit;
         }
         
         a[x-apple-data-detectors='true'] {
           color: inherit !important;
           text-decoration: none !important;
         }
         
         table,
         td {
           color: #000000;
         }
         
         #u_body a {
           color: #0000ee;
           text-decoration: underline;
         }
       </style>
     
     
     
       <!--[if !mso]><!-->
       <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
       <!--<![endif]-->
     
     </head>
     
     <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
       <!--[if IE]><div class="ie-container"><![endif]-->
       <!--[if mso]><div class="mso-container"><![endif]-->
       <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
         <tbody>
           <tr style="vertical-align: top">
             <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
               <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-family: 'Cabin',sans-serif; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                     <p style="font-size: 14px; line-height: 140%;"><strong>YOU ARE DOING WELL!</strong></p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-family: 'Cabin',sans-serif; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                     <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">You have reserved your tickets!</span></strong>
                                       </span>
                                     </p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                     <tr>
                                       <td style="padding-right: 0px;padding-left: 0px;" align="center">
     
                                         <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677560391833-461990.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 8%;max-width: 46.4px;"
                                           width="46.4" />
     
                                       </td>
                                     </tr>
                                   </table>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <h1 style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 22px; ">.</h1>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-family: 'Cabin',sans-serif; font-size: 18px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                     <p style="line-height: 160%;">It's time for the next step...<br />Please make the payment and enjoy!</p>
                                     <p style="line-height: 160%;"> </p>
                                     <p style="line-height: 160%;"><br />Remember,  you have 15 minutes before your tickets are returned to the event.</p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                   <div align="center">
                                     <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:44px; v-text-anchor:middle; width:88px;" arcsize="9%"  stroke="f" fillcolor="#ffffff"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Cabin',sans-serif;"><![endif]-->
                                     <a href="" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;font-family:'Cabin',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #ffffff; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
                                       <span style="display:block;padding:14px 44px 13px;line-height:120%;"></span>
                                     </a>
                                     <!--[if mso]></center></v:roundrect><![endif]-->
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-size: 18px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                     <p style="line-height: 160%; font-size: 14px; text-align: center;"><span style="font-size: 18px; line-height: 28.8px;">Thanks and regards...</span></p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                     <tr>
                                       <td style="padding-right: 0px;padding-left: 0px;" align="center">
     
                                         <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677558148557-favicon.ico" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 9%;max-width: 52.2px;"
                                           width="52.2" />
     
                                       </td>
                                     </tr>
                                   </table>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-family: 'Cabin',sans-serif; font-size: 17px; color: #ffffff; line-height: 180%; text-align: center; word-wrap: break-word;">
                                     <p style="line-height: 180%; text-align: center;"><span style="font-family: Cabin, sans-serif; line-height: 30.6px;"> Eventoo Team</span></p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
               <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
             </td>
           </tr>
         </tbody>
       </table>
       <!--[if mso]></div><![endif]-->
       <!--[if IE]></div><![endif]-->
     </body>
     
     </html>`,
    receiptUploaded: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
     <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
     
     <head>
       <!--[if gte mso 9]>
     <xml>
       <o:OfficeDocumentSettings>
         <o:AllowPNG/>
         <o:PixelsPerInch>96</o:PixelsPerInch>
       </o:OfficeDocumentSettings>
     </xml>
     <![endif]-->
       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <meta name="x-apple-disable-message-reformatting">
       <!--[if !mso]><!-->
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <!--<![endif]-->
       <title></title>
     
       <style type="text/css">
         @media only screen and (min-width: 620px) {
           .u-row {
             width: 600px !important;
           }
           .u-row .u-col {
             vertical-align: top;
           }
           .u-row .u-col-100 {
             width: 600px !important;
           }
         }
         
         @media (max-width: 620px) {
           .u-row-container {
             max-width: 100% !important;
             padding-left: 0px !important;
             padding-right: 0px !important;
           }
           .u-row .u-col {
             min-width: 320px !important;
             max-width: 100% !important;
             display: block !important;
           }
           .u-row {
             width: 100% !important;
           }
           .u-col {
             width: 100% !important;
           }
           .u-col>div {
             margin: 0 auto;
           }
         }
         
         body {
           margin: 0;
           padding: 0;
         }
         
         table,
         tr,
         td {
           vertical-align: top;
           border-collapse: collapse;
         }
         
         p {
           margin: 0;
         }
         
         .ie-container table,
         .mso-container table {
           table-layout: fixed;
         }
         
         * {
           line-height: inherit;
         }
         
         a[x-apple-data-detectors='true'] {
           color: inherit !important;
           text-decoration: none !important;
         }
         
         table,
         td {
           color: #000000;
         }
         
         #u_body a {
           color: #0000ee;
           text-decoration: underline;
         }
       </style>
     
     
     
       <!--[if !mso]><!-->
       <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
       <!--<![endif]-->
     
     </head>
     
     <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
       <!--[if IE]><div class="ie-container"><![endif]-->
       <!--[if mso]><div class="mso-container"><![endif]-->
       <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
         <tbody>
           <tr style="vertical-align: top">
             <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
               <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-family: 'Cabin',sans-serif; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                     <p style="font-size: 14px; line-height: 140%;"><strong>YOU ARE ALMOST THERE!</strong></p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-family: 'Cabin',sans-serif; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                     <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">Your receipt is uploaded!</span></strong>
                                       </span>
                                     </p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                     <tr>
                                       <td style="padding-right: 0px;padding-left: 0px;" align="center">
     
                                         <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677563623004-203062.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 8%;max-width: 46.4px;"
                                           width="46.4" />
     
                                       </td>
                                     </tr>
                                   </table>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <h1 style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 22px; ">.</h1>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-family: 'Cabin',sans-serif; font-size: 18px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                     <p style="line-height: 160%;">Your payment is being processed.<br />The organizer must check the receipt, we'll let you know the status in a moment.<br /><br />Please, wait a minute.</p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                   <div align="center">
                                     <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:44px; v-text-anchor:middle; width:88px;" arcsize="9%"  stroke="f" fillcolor="#ffffff"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Cabin',sans-serif;"><![endif]-->
                                     <a href="" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;font-family:'Cabin',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #ffffff; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
                                       <span style="display:block;padding:14px 44px 13px;line-height:120%;"></span>
                                     </a>
                                     <!--[if mso]></center></v:roundrect><![endif]-->
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-size: 18px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                     <p style="line-height: 160%; font-size: 14px; text-align: center;"><span style="font-size: 18px; line-height: 28.8px;">Thanks and regards...</span></p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                     <tr>
                                       <td style="padding-right: 0px;padding-left: 0px;" align="center">
     
                                         <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677558148557-favicon.ico" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 9%;max-width: 52.2px;"
                                           width="52.2" />
     
                                       </td>
                                     </tr>
                                   </table>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-family: 'Cabin',sans-serif; font-size: 17px; color: #ffffff; line-height: 180%; text-align: center; word-wrap: break-word;">
                                     <p style="line-height: 180%; text-align: center;"><span style="font-family: Cabin, sans-serif; line-height: 30.6px;"> Eventoo Team</span></p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
               <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
             </td>
           </tr>
         </tbody>
       </table>
       <!--[if mso]></div><![endif]-->
       <!--[if IE]></div><![endif]-->
     </body>
     
     </html>`,
    accepted: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
     <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
     
     <head>
       <!--[if gte mso 9]>
     <xml>
       <o:OfficeDocumentSettings>
         <o:AllowPNG/>
         <o:PixelsPerInch>96</o:PixelsPerInch>
       </o:OfficeDocumentSettings>
     </xml>
     <![endif]-->
       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <meta name="x-apple-disable-message-reformatting">
       <!--[if !mso]><!-->
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <!--<![endif]-->
       <title></title>
     
       <style type="text/css">
         @media only screen and (min-width: 620px) {
           .u-row {
             width: 600px !important;
           }
           .u-row .u-col {
             vertical-align: top;
           }
           .u-row .u-col-100 {
             width: 600px !important;
           }
         }
         
         @media (max-width: 620px) {
           .u-row-container {
             max-width: 100% !important;
             padding-left: 0px !important;
             padding-right: 0px !important;
           }
           .u-row .u-col {
             min-width: 320px !important;
             max-width: 100% !important;
             display: block !important;
           }
           .u-row {
             width: 100% !important;
           }
           .u-col {
             width: 100% !important;
           }
           .u-col>div {
             margin: 0 auto;
           }
         }
         
         body {
           margin: 0;
           padding: 0;
         }
         
         table,
         tr,
         td {
           vertical-align: top;
           border-collapse: collapse;
         }
         
         p {
           margin: 0;
         }
         
         .ie-container table,
         .mso-container table {
           table-layout: fixed;
         }
         
         * {
           line-height: inherit;
         }
         
         a[x-apple-data-detectors='true'] {
           color: inherit !important;
           text-decoration: none !important;
         }
         
         table,
         td {
           color: #000000;
         }
         
         #u_body a {
           color: #0000ee;
           text-decoration: underline;
         }
       </style>
     
     
     
       <!--[if !mso]><!-->
       <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
       <!--<![endif]-->
     
     </head>
     
     <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
       <!--[if IE]><div class="ie-container"><![endif]-->
       <!--[if mso]><div class="mso-container"><![endif]-->
       <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
         <tbody>
           <tr style="vertical-align: top">
             <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
               <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-family: 'Cabin',sans-serif; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                     <p style="font-size: 14px; line-height: 140%;"><strong>GOOD NEWS!</strong></p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-family: 'Cabin',sans-serif; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                     <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">Your receipt was accepted!</span></strong>
                                       </span>
                                     </p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                     <tr>
                                       <td style="padding-right: 0px;padding-left: 0px;" align="center">
     
                                         <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677564783737-851301.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 8%;max-width: 46.4px;"
                                           width="46.4" />
     
                                       </td>
                                     </tr>
                                   </table>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <h1 style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 22px; ">.</h1>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-family: 'Cabin',sans-serif; font-size: 18px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                     <p style="line-height: 160%;">Everything is going well and this is just the beginning.</p>
                                     <p style="line-height: 160%;">As your receipt was accepted by the organizer, in a few minutes we'll send your tickets.</p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                   <div align="center">
                                     <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:44px; v-text-anchor:middle; width:88px;" arcsize="9%"  stroke="f" fillcolor="#ffffff"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Cabin',sans-serif;"><![endif]-->
                                     <a href="" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;font-family:'Cabin',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #ffffff; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
                                       <span style="display:block;padding:14px 44px 13px;line-height:120%;"></span>
                                     </a>
                                     <!--[if mso]></center></v:roundrect><![endif]-->
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-size: 18px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                     <p style="line-height: 160%; font-size: 14px; text-align: center;"><span style="font-size: 18px; line-height: 28.8px;">Thanks and regards...</span></p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                     <tr>
                                       <td style="padding-right: 0px;padding-left: 0px;" align="center">
     
                                         <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677558148557-favicon.ico" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 9%;max-width: 52.2px;"
                                           width="52.2" />
     
                                       </td>
                                     </tr>
                                   </table>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-family: 'Cabin',sans-serif; font-size: 17px; color: #ffffff; line-height: 180%; text-align: center; word-wrap: break-word;">
                                     <p style="line-height: 180%; text-align: center;"><span style="font-family: Cabin, sans-serif; line-height: 30.6px;"> Eventoo Team</span></p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
               <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
             </td>
           </tr>
         </tbody>
       </table>
       <!--[if mso]></div><![endif]-->
       <!--[if IE]></div><![endif]-->
     </body>
     
     </html>`,
    denied: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
      <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <title></title>
    
      <style type="text/css">
        @media only screen and (min-width: 620px) {
          .u-row {
            width: 600px !important;
          }
          .u-row .u-col {
            vertical-align: top;
          }
          .u-row .u-col-100 {
            width: 600px !important;
          }
        }
        
        @media (max-width: 620px) {
          .u-row-container {
            max-width: 100% !important;
            padding-left: 0px !important;
            padding-right: 0px !important;
          }
          .u-row .u-col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }
          .u-row {
            width: 100% !important;
          }
          .u-col {
            width: 100% !important;
          }
          .u-col>div {
            margin: 0 auto;
          }
        }
        
        body {
          margin: 0;
          padding: 0;
        }
        
        table,
        tr,
        td {
          vertical-align: top;
          border-collapse: collapse;
        }
        
        p {
          margin: 0;
        }
        
        .ie-container table,
        .mso-container table {
          table-layout: fixed;
        }
        
        * {
          line-height: inherit;
        }
        
        a[x-apple-data-detectors='true'] {
          color: inherit !important;
          text-decoration: none !important;
        }
        
        table,
        td {
          color: #000000;
        }
      </style>
    
    
    
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
      <!--<![endif]-->
    
    </head>
    
    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
      <!--[if IE]><div class="ie-container"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="font-family: 'Cabin',sans-serif; font-size: 16px; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px;"><strong>BAD NEWS!</strong></span></p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="font-family: 'Cabin',sans-serif; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">Your receipt was denied!</span></strong>
                                      </span>
                                    </p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
    
                                        <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677658101537-448122.jpg" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 9%;max-width: 52.2px;"
                                          width="52.2" />
    
                                      </td>
                                    </tr>
                                  </table>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <h1 style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 22px; ">.</h1>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px 0px 4px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px 0px 4px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="font-family: 'Cabin',sans-serif; font-size: 18px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 160%;"> </p>
                                    <p style="line-height: 160%;">Sorry, something went wrong with your receipt</p>
                                    <p style="line-height: 160%;">and the organizer denied it.</p>
                                    <p style="line-height: 160%;">The tickets have been returned to the event.</p>
                                    <p style="line-height: 160%;"><br />Please try again.</p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <h1 style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 22px; ">.</h1>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="font-family: 'Cabin',sans-serif; font-size: 18px; color: #000000; line-height: 160%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 160%;"> </p>
                                    <p style="line-height: 160%;">Thanks and regards...<br /><br /></p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
    
                                        <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677558148557-favicon.ico" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 9%;max-width: 52.2px;"
                                          width="52.2" />
    
                                      </td>
                                    </tr>
                                  </table>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="font-family: 'Cabin',sans-serif; font-size: 17px; color: #ffffff; line-height: 180%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 180%; text-align: center;"><span style="font-family: Cabin, sans-serif; line-height: 30.6px;"> Eventoo Team</span></p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
              <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
      <!--[if mso]></div><![endif]-->
      <!--[if IE]></div><![endif]-->
    </body>
    
    </html>`,
     tickets: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
     <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
     
     <head>
       <!--[if gte mso 9]>
     <xml>
       <o:OfficeDocumentSettings>
         <o:AllowPNG/>
         <o:PixelsPerInch>96</o:PixelsPerInch>
       </o:OfficeDocumentSettings>
     </xml>
     <![endif]-->
       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <meta name="x-apple-disable-message-reformatting">
       <!--[if !mso]><!-->
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <!--<![endif]-->
       <title></title>
     
       <style type="text/css">
         @media only screen and (min-width: 620px) {
           .u-row {
             width: 600px !important;
           }
           .u-row .u-col {
             vertical-align: top;
           }
           .u-row .u-col-100 {
             width: 600px !important;
           }
         }
         
         @media (max-width: 620px) {
           .u-row-container {
             max-width: 100% !important;
             padding-left: 0px !important;
             padding-right: 0px !important;
           }
           .u-row .u-col {
             min-width: 320px !important;
             max-width: 100% !important;
             display: block !important;
           }
           .u-row {
             width: 100% !important;
           }
           .u-col {
             width: 100% !important;
           }
           .u-col>div {
             margin: 0 auto;
           }
         }
         
         body {
           margin: 0;
           padding: 0;
         }
         
         table,
         tr,
         td {
           vertical-align: top;
           border-collapse: collapse;
         }
         
         p {
           margin: 0;
         }
         
         .ie-container table,
         .mso-container table {
           table-layout: fixed;
         }
         
         * {
           line-height: inherit;
         }
         
         a[x-apple-data-detectors='true'] {
           color: inherit !important;
           text-decoration: none !important;
         }
         
         table,
         td {
           color: #000000;
         }
       </style>
     
     
     
       <!--[if !mso]><!-->
       <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
       <!--<![endif]-->
     
     </head>
     
     <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
       <!--[if IE]><div class="ie-container"><![endif]-->
       <!--[if mso]><div class="mso-container"><![endif]-->
       <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
         <tbody>
           <tr style="vertical-align: top">
             <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
               <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-family: 'Cabin',sans-serif; font-size: 16px; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                     <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px;"><strong>THIS IS FOR YOU!</strong></span></p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-family: 'Cabin',sans-serif; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                     <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">Your tickets are here!</span></strong>
                                       </span>
                                     </p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                     <tr>
                                       <td style="padding-right: 0px;padding-left: 0px;" align="center">
     
                                         <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677655052237-logo_eventoo_blanco.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 15%;max-width: 87px;"
                                           width="87" />
     
                                       </td>
                                     </tr>
                                   </table>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <h1 style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 22px; ">.</h1>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px 0px 4px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px 0px 4px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-family: 'Cabin',sans-serif; font-size: 18px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                     <p style="line-height: 160%;"><br />We hope you enjoy the event and it will be an unforgettable moment. We attach your tickets below.</p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <h1 style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 22px; ">.</h1>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-family: 'Cabin',sans-serif; font-size: 18px; color: #000000; line-height: 160%; text-align: center; word-wrap: break-word;">
                                     <p style="line-height: 160%;"> </p>
                                     <p style="line-height: 160%;">Thanks for your purchase, see you soon!<br /><br /></p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                     <tr>
                                       <td style="padding-right: 0px;padding-left: 0px;" align="center">
     
                                         <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677558148557-favicon.ico" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 9%;max-width: 52.2px;"
                                           width="52.2" />
     
                                       </td>
                                     </tr>
                                   </table>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-family: 'Cabin',sans-serif; font-size: 17px; color: #ffffff; line-height: 180%; text-align: center; word-wrap: break-word;">
                                     <p style="line-height: 180%; text-align: center;"><span style="font-family: Cabin, sans-serif; line-height: 30.6px;"> Eventoo Team</span></p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
               <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
             </td>
           </tr>
         </tbody>
       </table>
       <!--[if mso]></div><![endif]-->
       <!--[if IE]></div><![endif]-->
     </body>
     
     </html>`,
    expiredReservation: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
     <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
     
     <head>
       <!--[if gte mso 9]>
     <xml>
       <o:OfficeDocumentSettings>
         <o:AllowPNG/>
         <o:PixelsPerInch>96</o:PixelsPerInch>
       </o:OfficeDocumentSettings>
     </xml>
     <![endif]-->
       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <meta name="x-apple-disable-message-reformatting">
       <!--[if !mso]><!-->
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <!--<![endif]-->
       <title></title>
     
       <style type="text/css">
         @media only screen and (min-width: 620px) {
           .u-row {
             width: 600px !important;
           }
           .u-row .u-col {
             vertical-align: top;
           }
           .u-row .u-col-100 {
             width: 600px !important;
           }
         }
         
         @media (max-width: 620px) {
           .u-row-container {
             max-width: 100% !important;
             padding-left: 0px !important;
             padding-right: 0px !important;
           }
           .u-row .u-col {
             min-width: 320px !important;
             max-width: 100% !important;
             display: block !important;
           }
           .u-row {
             width: 100% !important;
           }
           .u-col {
             width: 100% !important;
           }
           .u-col>div {
             margin: 0 auto;
           }
         }
         
         body {
           margin: 0;
           padding: 0;
         }
         
         table,
         tr,
         td {
           vertical-align: top;
           border-collapse: collapse;
         }
         
         p {
           margin: 0;
         }
         
         .ie-container table,
         .mso-container table {
           table-layout: fixed;
         }
         
         * {
           line-height: inherit;
         }
         
         a[x-apple-data-detectors='true'] {
           color: inherit !important;
           text-decoration: none !important;
         }
         
         table,
         td {
           color: #000000;
         }
         
         #u_body a {
           color: #0000ee;
           text-decoration: underline;
         }
       </style>
     
     
     
       <!--[if !mso]><!-->
       <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
       <!--<![endif]-->
     
     </head>
     
     <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
       <!--[if IE]><div class="ie-container"><![endif]-->
       <!--[if mso]><div class="mso-container"><![endif]-->
       <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
         <tbody>
           <tr style="vertical-align: top">
             <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
               <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-family: 'Cabin',sans-serif; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                     <p style="font-size: 14px; line-height: 140%;"><strong>OOPS!</strong></p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-family: 'Cabin',sans-serif; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                     <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">Your reservation has expired!</span></strong>
                                       </span>
                                     </p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                     <tr>
                                       <td style="padding-right: 0px;padding-left: 0px;" align="center">
     
                                         <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677566874773-78011.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 8%;max-width: 46.4px;"
                                           width="46.4" />
     
                                       </td>
                                     </tr>
                                   </table>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <h1 style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 22px; ">.</h1>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-family: 'Cabin',sans-serif; font-size: 18px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                     <p style="line-height: 160%;">Sorry, the reservation time has expired. The tickets have been returned to the event.</p>
                                     <p style="line-height: 160%;"><br />Please try again.</p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                   <div align="center">
                                     <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:44px; v-text-anchor:middle; width:88px;" arcsize="9%"  stroke="f" fillcolor="#ffffff"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Cabin',sans-serif;"><![endif]-->
                                     <a href="" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;font-family:'Cabin',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #ffffff; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
                                       <span style="display:block;padding:14px 44px 13px;line-height:120%;"></span>
                                     </a>
                                     <!--[if mso]></center></v:roundrect><![endif]-->
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-size: 18px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                     <p style="line-height: 160%; font-size: 14px; text-align: center;"><span style="font-size: 18px; line-height: 28.8px;">Thanks and regards...</span></p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
     
               <div class="u-row-container" style="padding: 0px;background-color: transparent">
                 <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                   <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
     
                     <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                     <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                       <div style="height: 100%;width: 100% !important;">
                         <!--[if (!mso)&(!IE)]><!-->
                         <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                           <!--<![endif]-->
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                     <tr>
                                       <td style="padding-right: 0px;padding-left: 0px;" align="center">
     
                                         <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677558148557-favicon.ico" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 9%;max-width: 52.2px;"
                                           width="52.2" />
     
                                       </td>
                                     </tr>
                                   </table>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                             <tbody>
                               <tr>
                                 <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
     
                                   <div style="font-family: 'Cabin',sans-serif; font-size: 17px; color: #ffffff; line-height: 180%; text-align: center; word-wrap: break-word;">
                                     <p style="line-height: 180%; text-align: center;"><span style="font-family: Cabin, sans-serif; line-height: 30.6px;"> Eventoo Team</span></p>
                                   </div>
     
                                 </td>
                               </tr>
                             </tbody>
                           </table>
     
                           <!--[if (!mso)&(!IE)]><!-->
                         </div>
                         <!--<![endif]-->
                       </div>
                     </div>
                     <!--[if (mso)|(IE)]></td><![endif]-->
                     <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                   </div>
                 </div>
               </div>
     
     
               <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
             </td>
           </tr>
         </tbody>
       </table>
       <!--[if mso]></div><![endif]-->
       <!--[if IE]></div><![endif]-->
     </body>
     
     </html>`,
    reviewEvent: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
      <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <title></title>
    
      <style type="text/css">
        @media only screen and (min-width: 620px) {
          .u-row {
            width: 600px !important;
          }
          .u-row .u-col {
            vertical-align: top;
          }
          .u-row .u-col-20 {
            width: 120px !important;
          }
          .u-row .u-col-100 {
            width: 600px !important;
          }
        }
        
        @media (max-width: 620px) {
          .u-row-container {
            max-width: 100% !important;
            padding-left: 0px !important;
            padding-right: 0px !important;
          }
          .u-row .u-col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }
          .u-row {
            width: 100% !important;
          }
          .u-col {
            width: 100% !important;
          }
          .u-col>div {
            margin: 0 auto;
          }
        }
        
        body {
          margin: 0;
          padding: 0;
        }
        
        table,
        tr,
        td {
          vertical-align: top;
          border-collapse: collapse;
        }
        
        p {
          margin: 0;
        }
        
        .ie-container table,
        .mso-container table {
          table-layout: fixed;
        }
        
        * {
          line-height: inherit;
        }
        
        a[x-apple-data-detectors='true'] {
          color: inherit !important;
          text-decoration: none !important;
        }
        
        table,
        td {
          color: #000000;
        }
      </style>
    
    
    
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
      <!--<![endif]-->
    
    </head>
    
    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
      <!--[if IE]><div class="ie-container"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="font-family: 'Cabin',sans-serif; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 140%;"><strong>WE NEED YOU!</strong></p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="font-family: 'Cabin',sans-serif; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">Let us know your opinion!</span></strong>
                                      </span>
                                    </p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
    
                                        <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677567668186-898352.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 8%;max-width: 46.4px;"
                                          width="46.4" />
    
                                      </td>
                                    </tr>
                                  </table>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <h1 style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 22px; ">.</h1>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px 0px 4px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px 0px 4px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="font-family: 'Cabin',sans-serif; font-size: 18px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 160%;">Rate your experience and help us improve.<br />Your review is very important for future events.</p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="120" style="width: 120px;padding: 2px 1px 1px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-20" style="max-width: 320px;min-width: 120px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 2px 1px 1px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                      <a href="https://www.eventoo.com.ar/new-review/${eventId}?stars=1">
                                        <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677568275030-rating1Star.png" alt="star1" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 40px;"
                                          width="40" />
                                          </a>
                                      </td>
                                    </tr>
                                  </table>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="120" style="width: 120px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div class="u-col u-col-20" style="max-width: 320px;min-width: 120px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                      <a href="https://www.eventoo.com.ar/new-review/${eventId}?stars=2">
                                        <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677568280590-rating1Star.png" alt="star2" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 40px;"
                                          width="40" />
                                          </a>    
                                      </td>
                                    </tr>
                                  </table>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="120" style="width: 120px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div class="u-col u-col-20" style="max-width: 320px;min-width: 120px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                      <a href="https://www.eventoo.com.ar/new-review/${eventId}?stars=3">
                                        <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677568286696-rating1Star.png" alt="star3" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 40px;"
                                          width="40" />
                                          </a>
                                      </td>
                                    </tr>
                                  </table>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="120" style="width: 120px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div class="u-col u-col-20" style="max-width: 320px;min-width: 120px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                      <a href="https://www.eventoo.com.ar/new-review/${eventId}?stars=4">
                                        <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677568291127-rating1Star.png" alt="star4" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 40px;"
                                          width="40" />
                                          </a>
                                      </td>
                                    </tr>
                                  </table>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="120" style="width: 120px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div class="u-col u-col-20" style="max-width: 320px;min-width: 120px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                      <a href="https://www.eventoo.com.ar/new-review/${eventId}?stars=5">
                                        <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677568296738-rating1Star.png" alt="star5" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 40px;"
                                          width="40" />
                                          </a>
                                      </td>
                                    </tr>
                                  </table>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="font-family: 'Cabin',sans-serif; font-size: 18px; color: #000000; line-height: 160%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 160%;"></p>
                                    <p style="line-height: 160%;">Thanks and regards...<br /><br /></p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
    
                                        <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677558148557-favicon.ico" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 9%;max-width: 52.2px;"
                                          width="52.2" />
    
                                      </td>
                                    </tr>
                                  </table>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="font-family: 'Cabin',sans-serif; font-size: 17px; color: #ffffff; line-height: 180%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 180%; text-align: center;"><span style="font-family: Cabin, sans-serif; line-height: 30.6px;"> Eventoo Team</span></p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
              <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
      <!--[if mso]></div><![endif]-->
      <!--[if IE]></div><![endif]-->
    </body>
    
    </html>`,
  };
  const subjectTemplates = {
    reserveTickets: "Tickets reservation",
    receiptUploaded: "Receipt uploaded",
    accepted: "Transfer accepted",
    denied: "Transfer denied",
    tickets: "Your tickets are here",
    expiredReservation: "Expired reservation",
    reviewEvent: "Review the event",
  };
  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    secureConnection: false,
    port: 465,
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const optionsPDF = {
    from: `Eventoo <${process.env.EMAIL_USER}>`,
    to,
    subject: subjectTemplates[template],
    text: "Plaintext version of the message",
    html: emailTemplates[template],
    attachments: [
      {
        filename: "tickets.pdf",
        content: pdf,
        contentType: "application/pdf",
      },
    ],
  };

  const options = {
    from: `Eventoo <${process.env.EMAIL_USER}>`,
    to,
    subject: subjectTemplates[template],
    text: "Plaintext version of the message",
    html: emailTemplates[template],
  };

  transporter.sendMail(pdf ? optionsPDF : options, (error, info) => {
    if (error) {
      console.log("Error sending mail: ", error);
    } else {
      console.log("Mail sent: ", info.response);
    }
  });
};

const sendOrganizerNotifications = (to, template, eventId) => {
  const emailTemplates = {
    reservationReceived: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
      <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <title></title>
    
      <style type="text/css">
        @media only screen and (min-width: 620px) {
          .u-row {
            width: 600px !important;
          }
          .u-row .u-col {
            vertical-align: top;
          }
          .u-row .u-col-100 {
            width: 600px !important;
          }
        }
        
        @media (max-width: 620px) {
          .u-row-container {
            max-width: 100% !important;
            padding-left: 0px !important;
            padding-right: 0px !important;
          }
          .u-row .u-col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }
          .u-row {
            width: 100% !important;
          }
          .u-col {
            width: 100% !important;
          }
          .u-col>div {
            margin: 0 auto;
          }
        }
        
        body {
          margin: 0;
          padding: 0;
        }
        
        table,
        tr,
        td {
          vertical-align: top;
          border-collapse: collapse;
        }
        
        p {
          margin: 0;
        }
        
        .ie-container table,
        .mso-container table {
          table-layout: fixed;
        }
        
        * {
          line-height: inherit;
        }
        
        a[x-apple-data-detectors='true'] {
          color: inherit !important;
          text-decoration: none !important;
        }
        
        table,
        td {
          color: #000000;
        }
        
        #u_body a {
          color: #0000ee;
          text-decoration: underline;
        }
      </style>
    
    
    
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
      <!--<![endif]-->
    
    </head>
    
    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
      <!--[if IE]><div class="ie-container"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="font-family: 'Cabin',sans-serif; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 140%;"><strong>NEWS FOR YOU!</strong></p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="font-family: 'Cabin',sans-serif; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">You have a new reservation!</span></strong>
                                      </span>
                                    </p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
    
                                        <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677560391833-461990.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 8%;max-width: 46.4px;"
                                          width="46.4" />
    
                                      </td>
                                    </tr>
                                  </table>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <h1 style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 22px; ">.</h1>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="font-family: 'Cabin',sans-serif; font-size: 18px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 160%;">Someone is interested in your event! We have provided the necessary information to complete the purchase</p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                  <div align="center">
                                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:44px; v-text-anchor:middle; width:88px;" arcsize="9%"  stroke="f" fillcolor="#ffffff"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Cabin',sans-serif;"><![endif]-->
                                    <a href="" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;font-family:'Cabin',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #ffffff; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
                                      <span style="display:block;padding:14px 44px 13px;line-height:120%;"></span>
                                    </a>
                                    <!--[if mso]></center></v:roundrect><![endif]-->
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="font-size: 18px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 160%; font-size: 14px; text-align: center;"><span style="font-size: 18px; line-height: 28.8px;">Thanks and regards...</span></p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
    
                                        <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677558148557-favicon.ico" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 9%;max-width: 52.2px;"
                                          width="52.2" />
    
                                      </td>
                                    </tr>
                                  </table>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="font-family: 'Cabin',sans-serif; font-size: 17px; color: #ffffff; line-height: 180%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 180%; text-align: center;"><span style="font-family: Cabin, sans-serif; line-height: 30.6px;"> Eventoo Team</span></p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
              <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
      <!--[if mso]></div><![endif]-->
      <!--[if IE]></div><![endif]-->
    </body>
    
    </html>`,
    newTransfer: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
    <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 620px) {
        .u-row {
          width: 600px !important;
        }
        .u-row .u-col {
          vertical-align: top;
        }
        .u-row .u-col-100 {
          width: 600px !important;
        }
      }
      
      @media (max-width: 620px) {
        .u-row-container {
          max-width: 100% !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
        .u-row .u-col {
          min-width: 320px !important;
          max-width: 100% !important;
          display: block !important;
        }
        .u-row {
          width: 100% !important;
        }
        .u-col {
          width: 100% !important;
        }
        .u-col>div {
          margin: 0 auto;
        }
      }
      
      body {
        margin: 0;
        padding: 0;
      }
      
      table,
      tr,
      td {
        vertical-align: top;
        border-collapse: collapse;
      }
      
      p {
        margin: 0;
      }
      
      .ie-container table,
      .mso-container table {
        table-layout: fixed;
      }
      
      * {
        line-height: inherit;
      }
      
      a[x-apple-data-detectors='true'] {
        color: inherit !important;
        text-decoration: none !important;
      }
      
      table,
      td {
        color: #000000;
      }
    </style>
  
  
  
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
    <!--<![endif]-->
  
  </head>
  
  <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
      <tbody>
        <tr style="vertical-align: top">
          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                        <!--<![endif]-->
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  
                                <div style="font-family: 'Cabin',sans-serif; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 140%;"><strong>THIS IS COOL!</strong></p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px;font-family:'Cabin',sans-serif;" align="left">
  
                                <div style="font-family: 'Cabin',sans-serif; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">You have a new transfer!</span></strong>
                                    </span>
                                  </p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td style="padding-right: 0px;padding-left: 0px;" align="center">
  
                                      <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677613271248-48485.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 8%;max-width: 46.4px;"
                                        width="46.4" />
  
                                    </td>
                                  </tr>
                                </table>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--<![endif]-->
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  
                                <h1 style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 22px; ">.</h1>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px 0px 4px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px 0px 4px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                        <!--<![endif]-->
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
  
                                <div style="font-family: 'Cabin',sans-serif; font-size: 18px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                  <p style="line-height: 160%;">You have a pending receipt to check.</p>
                                  <p style="line-height: 160%;">We invite you to look at its details</p>
                                  <p style="line-height: 160%;">to finalize the sale.</p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--<![endif]-->
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  
                                <h1 style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 22px; ">.</h1>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                        <!--<![endif]-->
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
  
                                <div style="font-family: 'Cabin',sans-serif; font-size: 18px; color: #000000; line-height: 160%; text-align: center; word-wrap: break-word;">
                                  <p style="line-height: 160%;"> </p>
                                  <p style="line-height: 160%;">Thanks and regards...<br /><br /></p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
  
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
  
                  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="height: 100%;width: 100% !important;">
                      <!--[if (!mso)&(!IE)]><!-->
                      <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                        <!--<![endif]-->
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td style="padding-right: 0px;padding-left: 0px;" align="center">
  
                                      <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677558148557-favicon.ico" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 9%;max-width: 52.2px;"
                                        width="52.2" />
  
                                    </td>
                                  </tr>
                                </table>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  
                                <div style="font-family: 'Cabin',sans-serif; font-size: 17px; color: #ffffff; line-height: 180%; text-align: center; word-wrap: break-word;">
                                  <p style="line-height: 180%; text-align: center;"><span style="font-family: Cabin, sans-serif; line-height: 30.6px;"> Eventoo Team</span></p>
                                </div>
  
                              </td>
                            </tr>
                          </tbody>
                        </table>
  
                        <!--[if (!mso)&(!IE)]><!-->
                      </div>
                      <!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
  
  
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>
  
  </html>`,
    reviewReceived: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
      <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <title></title>
    
      <style type="text/css">
        @media only screen and (min-width: 620px) {
          .u-row {
            width: 600px !important;
          }
          .u-row .u-col {
            vertical-align: top;
          }
          .u-row .u-col-100 {
            width: 600px !important;
          }
        }
        
        @media (max-width: 620px) {
          .u-row-container {
            max-width: 100% !important;
            padding-left: 0px !important;
            padding-right: 0px !important;
          }
          .u-row .u-col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }
          .u-row {
            width: 100% !important;
          }
          .u-col {
            width: 100% !important;
          }
          .u-col>div {
            margin: 0 auto;
          }
        }
        
        body {
          margin: 0;
          padding: 0;
        }
        
        table,
        tr,
        td {
          vertical-align: top;
          border-collapse: collapse;
        }
        
        p {
          margin: 0;
        }
        
        .ie-container table,
        .mso-container table {
          table-layout: fixed;
        }
        
        * {
          line-height: inherit;
        }
        
        a[x-apple-data-detectors='true'] {
          color: inherit !important;
          text-decoration: none !important;
        }
        
        table,
        td {
          color: #000000;
        }
        
        #u_body a {
          color: #0000ee;
          text-decoration: underline;
        }
      </style>
    
    
    
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
      <!--<![endif]-->
    
    </head>
    
    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
      <!--[if IE]><div class="ie-container"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="font-family: 'Cabin',sans-serif; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 140%;"><strong>NEWS FOR YOU!</strong></p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="font-family: 'Cabin',sans-serif; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">You have a new review!</span></strong>
                                      </span>
                                    </p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
    
                                        <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677559568777-star-vector-png-transparent-image-pngpix-21.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 7%;max-width: 40.6px;"
                                          width="40.6" />
    
                                      </td>
                                    </tr>
                                  </table>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <h1 style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 22px; ">.</h1>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="font-family: 'Cabin',sans-serif; font-size: 18px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 160%;">An attendant of your event has given an opinion about it, we invite you to know their review.. See you soon!</p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                  <div align="center">
                                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:44px; v-text-anchor:middle; width:139px;" arcsize="9%"  stroke="f" fillcolor="#ff6600"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Cabin',sans-serif;"><![endif]-->
                                    <a href="https://www.eventoo.com.ar/Event/${eventId}" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;font-family:'Cabin',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #ff6600; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
                                      <span style="display:block;padding:14px 44px 13px;line-height:120%;"><span style="line-height: 16.8px;"><strong><span style="line-height: 16.8px;">REVIEW</span></strong>
                                      </span>
                                      </span>
                                    </a>
                                    <!--[if mso]></center></v:roundrect><![endif]-->
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="font-size: 18px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 160%; font-size: 14px; text-align: center;"><span style="font-size: 18px; line-height: 28.8px;">Thanks and regards...</span></p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
    
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #007f80;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #007f80;"><![endif]-->
    
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <!--<![endif]-->
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
    
                                        <img align="center" border="0" src="https://assets.unlayer.com/projects/141608/1677558148557-favicon.ico" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 9%;max-width: 52.2px;"
                                          width="52.2" />
    
                                      </td>
                                    </tr>
                                  </table>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
    
                                  <div style="font-family: 'Cabin',sans-serif; font-size: 17px; color: #ffffff; line-height: 180%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 180%; text-align: center;"><span style="font-family: Cabin, sans-serif; line-height: 30.6px;"> Eventoo Team</span></p>
                                  </div>
    
                                </td>
                              </tr>
                            </tbody>
                          </table>
    
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
    
    
              <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
      <!--[if mso]></div><![endif]-->
      <!--[if IE]></div><![endif]-->
    </body>
    
    </html>`,
  };
  const subjectTemplates = {
    reservationReceived: "New reservation",
    newTransfer: "New transfer",
    reviewReceived: "New review",
  };
  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    secureConnection: false,
    port: 465,
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const options = {
    from: `Eventoo <${process.env.EMAIL_USER}>`,
    to,
    subject: subjectTemplates[template],
    text: "Plaintext version of the message",
    html: emailTemplates[template],
  };

  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log("Error sending mail: ", error);
    } else {
      console.log("Mail sent: ", info.response);
    }
  });
};

module.exports = {
  sendEmail,
  sendBuyerNotifications,
  sendOrganizerNotifications,
};
