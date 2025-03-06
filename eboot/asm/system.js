/****************************
 * button
 ****************************/
section("mod");
align(4)
sym("buttonFix", () => {
  li($t1, 0x6000);
  andi($at, $a0, 0x6000);
  beq($at, $zero, "@@done");
  nop();
  beq($at, $t1, "@@done");
  nop();
  xori($a0, $a0, 0x6000);
  sw($a0, 4, $sp);
  label("@@done");
  jr($ra);
  lui($v0, 2);
});
section("eboot");
org(0x8806ef4);
jal("buttonFix");

/****************************
 * system language
 ****************************/
section("mod");
sym("languageChange", () => {
  li($a0, 1);
  jr($ra);
  sw($a0, 4, $s0);
});
section("eboot");
org(0x881a3a4);
sw($a0, 8, $s0);
org(0x881a384);
jal("languageChange");
