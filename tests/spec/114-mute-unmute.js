import {
  accountProfileFollowButton,
  accountProfileMoreOptionsButton,
  communityNavButton,
  getNthSearchResult,
  getNthStatus,
  getNthStatusOptionsButton,
  getNthDialogOptionsOption,
  getUrl,
  modalDialog,
  closeDialogButton,
  confirmationDialogOKButton, sleep
} from '../utils'
import { Selector as $ } from 'testcafe'
import { loginAsFoobar } from '../roles'
import { postAs } from '../serverActions'

fixture`114-mute-unmute.js`
  .page`http://localhost:4002`

test('Can mute and unmute an account', async t => {
  await loginAsFoobar(t)
  let post = 'blah blah blah'
  await postAs('admin', post)

  await t.expect(getNthStatus(1).innerText).contains(post, { timeout: 20000 })
    .click(getNthStatusOptionsButton(1))
    .expect(getNthDialogOptionsOption(1).innerText).contains('Unfollow @admin')
    .expect(getNthDialogOptionsOption(2).innerText).contains('Block @admin')
    .expect(getNthDialogOptionsOption(3).innerText).contains('Mute @admin')
  await sleep(1000)
  await t
    .click(getNthDialogOptionsOption(3))
  await sleep(1000)
  await t
    .click(confirmationDialogOKButton)
    .expect(modalDialog.exists).notOk()
  await sleep(1000)
  await t
    .click(communityNavButton)
    .click($('a[href="/muted"]'))
    .expect(getNthSearchResult(1).innerText).contains('@admin')
    .click(getNthSearchResult(1))
    .expect(getUrl()).contains('/accounts/1')
    .click(accountProfileMoreOptionsButton)
    .expect(getNthDialogOptionsOption(1).innerText).contains('Mention @admin')
    .expect(getNthDialogOptionsOption(2).innerText).contains('Unfollow @admin')
    .expect(getNthDialogOptionsOption(3).innerText).contains('Block @admin')
    .expect(getNthDialogOptionsOption(4).innerText).contains('Unmute @admin')
  await sleep(1000)
  await t
    .click(getNthDialogOptionsOption(4))
  await sleep(1000)
  await t
    .click(accountProfileMoreOptionsButton)
    .expect(getNthDialogOptionsOption(1).innerText).contains('Mention @admin')
    .expect(getNthDialogOptionsOption(2).innerText).contains('Unfollow @admin')
    .expect(getNthDialogOptionsOption(3).innerText).contains('Block @admin')
    .expect(getNthDialogOptionsOption(4).innerText).contains('Mute @admin')
  await sleep(1000)
  await t
    .click(closeDialogButton)
    .expect(accountProfileFollowButton.getAttribute('aria-label')).eql('Unfollow')
})
