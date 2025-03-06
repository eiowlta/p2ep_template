//mips.d.ts

section("mod");
align(4)
sym("contactFilePointers", () => {
  write_u32(0);
  write_u32(0);
});
section("eboot");
org(0x8902cb0);
jal("contact_script_free_files");
// sym("contactAlloc", () => {
//   li($a0, 0x87000 - 0x18000);
//   jal("calloc");
//   nop();
//   lui_hi($v1, 0x8f0);
//   li($at, 0x18000);
//   j(0x8902ad4);
//   sub($v0, $v0, $at);
// });
// sym("contactFree", () => {
//   li($at, 0x18000);
//   j("free");
//   addu($a0, $a0, $at);
// });

// section("eboot");
// org(0x8902ad0);
// jal("contactAlloc");
// org(0x8902cb0);
// jal("contactFree");

// overwriteSymbol("contact_script_get_file", () => {
//   lui_hi($at, "contactFilePointers");
//   sll($a0, $a0, 2);
//   addu($at, $a0, $at);
//   jr($ra);
//   lw($v0, "contactFilePointers", $at);
// });
// overwriteSymbol("contact_script_find_entry", () => {
//   const scriptType = $a0;
//   const section = $a1;
//   const entry = $a2;
//   const filePtr = $t0;

//   bltz(scriptType, "@@skip");
//   lui_hi($at, "currentContactScriptType");
//   lw(scriptType, "currentContactScriptType", $at);
//   label("@@skip");
//   sw(scriptType, "currentContactScriptType", $at);
//   la(filePtr, "contactFilePointers");
//   sll(scriptType, scriptType, 2);
//   addu(filePtr, scriptType, filePtr);
//   lw(filePtr, 0, filePtr);

//   sll(section, section, 4);
//   sll(entry, entry, 2);

//   addu($t1, filePtr, section);
//   lhu($t2, 0, $t1);
//   lhu($t3, 2, $t1);
//   sll($t2, $t2, 1);
//   sll($t3, $t3, 1);
//   addu($t2, $t2, filePtr);
//   addu($t2, $t2, entry);
//   lhu($t2, 0, $t2);
//   addu($t2, $t2, $t3);

//   jr($ra);
//   addu($v0, $t2, filePtr);
// });
// overwriteSymbol("contact_script_init_file", () => {
//   const bnpHandle = $s0;
//   const contactType = $s1;
//   addiu($sp, $sp, -0x20);
//   sw($ra, 0x1c, $sp);
//   sw($s0, 0x18, $sp);
//   sw($s1, 0x14, $sp);
//   sw($s2, 0x10, $sp);

//   lw(bnpHandle, 0xc, bnpHandle);
//   addiu($s0, bnpHandle, -1);
// });
